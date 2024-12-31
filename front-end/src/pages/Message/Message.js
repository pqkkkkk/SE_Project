import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import images from "../../assets/images";
import { useState, useEffect } from "react";
import {sendMessage} from "../../services/SocketService";
import {GetUser} from "../../services/UserStorageService";
import {GetConnectingUsers, GetMessagesHistory} from "../../services/ApiService";
import {eventEmitter} from "../../services/EventEmitterService";

const cx = classNames.bind(styles);
function Messages() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedManagement, setSelectedManagement] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [connectingUsers, setConnectingUsers] = useState([]);
    const [messagesHistory, setMessagesHistory] = useState([]);
    const [messageValue, setMessageValue] = useState("");
    useEffect(() => {
        setCurrentUser(GetUser());
        GetConnectingUsers(GetUser().id, GetUser().userRole)
            .then((data) => {
                data = data.map((item) => {
                    return {...item, haveNewMessage: false};
                });
                setConnectingUsers(data);
            })
            .catch((error) => {
                console.error(error);
            });
        eventEmitter.on('newMessage', handleNewMessage);
        return () => {
            eventEmitter.off('newMessage', handleNewMessage);
        };
    } , []);

    const filteredDoctors = connectingUsers.filter((management) =>
        management.opponent.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSelectManagement = (management) => {
        connectingUsers.find((item) => item.opponent.id === management.opponent.id).haveNewMessage = false;
        setSelectedManagement(management);
        GetMessagesHistory(currentUser.id, management.opponent.id)
            .then((data) => {
                setMessagesHistory(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const handleNewMessage = (message) => {
        console.log('New message:', message);
        const senderId = message.senderId;
        const correspondingManagement = connectingUsers.find((management) => management.opponent.id === senderId);

        if (!correspondingManagement) {
            console.log('No corresponding management');
            return;
        }
        else {
            correspondingManagement.haveNewMessage = true;
        }
        setConnectingUsers((prevState) => [correspondingManagement, ...prevState.filter((management) => management.opponent.id !== senderId)]);

        if(selectedManagement && selectedManagement.opponent.id === senderId) {
            setMessagesHistory((prevState) => [...prevState, message]);
        }
    };
    const handleSendMessage = () => {
        if (!messageValue) {
            alert("Empty message");
            return;
        }
        const messageObject = {
            content: messageValue,
            senderId: currentUser.id,
            receiverId: selectedManagement.opponent.id,
        };
        sendMessage(messageObject, selectedManagement.opponent.id);
        setMessageValue("");
        setMessagesHistory((prevState) => [...prevState, messageObject]);
        setConnectingUsers((prevState) => [selectedManagement, ...prevState.filter((management) => management.opponent.id !== selectedManagement.opponent.id)]);
    }
    return (
        <main className={cx('message')}>
            <div className={cx('side-bar')}>
                <h2>Messages</h2>
                <div className={cx("search")}>
                    <input
                        className={cx("search-input")}
                        type="text"
                        placeholder="Search doctor"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className={cx("list-doctors")}>
                    {filteredDoctors.map((management) => (
                        <div
                            key={management.opponent.id}
                            className={cx('doctor', management.haveNewMessage && 'new-message')}
                            onClick={() => handleSelectManagement(management)}
                        >
                            <img src={images.doctorHomeSpecialist1} alt={management.opponent.fullName} className={cx('doctor-img')} />
                            <p className={cx('doctor-name')}>{management.opponent.fullName}</p>
                        </div>
                    ))}

                    {filteredDoctors.length === 0 && (
                        <p className={cx("no-result")}>Không tìm thấy bác sĩ</p>
                    )}
                </div>
            </div>

            {/* Hiển thị content-chat nếu đã chọn bác sĩ */}
            {selectedManagement && (
                <div className={cx('chat')}>
                    <div className={cx('header')}>
                        <img src={images.doctorHomeSpecialist1} alt={selectedManagement.opponent.fullName} className={cx('doctor-img')} />
                        <a href={`/doctor/${selectedManagement.id}`} className={cx('info')}>
                            <p className={cx('doctor-name')}>{selectedManagement.opponent.fullName}</p>
                            <p className={cx('activity')}>{selectedManagement.activity}</p>
                        </a>
                    </div>
                    <div className={cx('content-chat')}>
                        {messagesHistory.map((message) => (
                            <div className={cx('message-item', message.senderId === currentUser.id ? 'me' : 'doctor')}>
                                {message.senderId !== currentUser.id && <img src={images.doctorHomeSpecialist1} alt={selectedManagement.name} className={cx('doctor-img')} />}
                                <p className={cx('message-content')}>{message.content}</p>
                            </div>
                        ))
                        }

                    </div>
                    <div className={cx('input')}>
                        <img src={images.image_chat} alt="Image" className={cx('image')}/>
                        <input type="text" value={messageValue} onChange={(e) => setMessageValue(e.target.value)} placeholder="Type a message" className={cx('input-message')} />
                        <img src={images.face_smile_solid} alt="Icon" className={cx('icon')}/>
                        <img src={images.paper_plane} alt="Send" onClick={handleSendMessage} className={cx('send')}/>
                    </div>
                    
                </div>
            )}

            {selectedManagement && (
                <div className={cx('more-info')}>
                    <img src={images.doctorHomeSpecialist1} alt={selectedManagement.name} className={cx('doctor-img')} />
                    <p className={cx('doctor-name')}>{selectedManagement.opponent.fullName}</p>
                    <p className={cx('activity')}>{selectedManagement.activity}</p>
                    <a href={`/doctor/${selectedManagement.opponent.id}`} className={cx('profile')}>
                        <img src={images.user} alt="User" className={cx('user')} />
                        <p>Trang cá nhân</p>
                    </a>
                </div>
            )}
        </main>
    );
}

export default Messages;
