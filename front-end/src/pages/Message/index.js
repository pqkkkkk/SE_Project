import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import images from "../../assets/images";
import { useState } from "react";

const cx = classNames.bind(styles);

function Messages() {
    const [searchValue, setSearchValue] = useState(""); // Lưu giá trị tìm kiếm
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Lưu bác sĩ được chọn

    // Mockdata danh sach bac si
    const doctors = [
        { id: 1, name: "Dr. Le Bao", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
        { id: 2, name: "Dr. James", image: images.doctorHomeSpecialist1, activity: "Ngoại tuyến" },
        { id: 3, name: "Dr. John", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
        { id: 4, name: "Dr. Le Bao", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
        { id: 5, name: "Dr. James", image: images.doctorHomeSpecialist1, activity: "Ngoại tuyến" },
        { id: 6, name: "Dr. John", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
        { id: 7, name: "Dr. Le Bao", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
        { id: 8, name: "Dr. James", image: images.doctorHomeSpecialist1, activity: "Ngoại tuyến" },
        { id: 9, name: "Dr. John", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
        { id: 10, name: "Dr. Le Bao", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
        { id: 11, name: "Dr. James", image: images.doctorHomeSpecialist1, activity: "Ngoại tuyến" },
        { id: 12, name: "Dr. John", image: images.doctorHomeSpecialist1, activity: "Đang hoạt động" },
    ];

    // Loc danh sach bac si tim kiem
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor); // Cap nhat bac si duoc chon
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value); // Cap nhat thong tin bac si tim kiem
    };

    return (
        <main className={cx('message')}>
            <div className={cx('side-bar')}>
                <h2>Messages</h2>
                <div className={cx("search")}>
                    <input
                        className={cx("search-input")}
                        type="text"
                        placeholder="Search doctor"
                        value={searchValue} // Liên kết giá trị với state
                        onChange={handleSearchChange} // Xử lý khi người dùng nhập
                    />
                    {/* <button className={cx("search-btn")}>Search</button>  */}
                </div>

                <div className={cx("list-doctors")}>
                    {filteredDoctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className={cx('doctor')}
                            onClick={() => handleSelectDoctor(doctor)} // Xử lý khi nhấn vào bác sĩ
                        >
                            <img src={doctor.image} alt={doctor.name} className={cx('doctor-img')} />
                            <p className={cx('doctor-name')}>{doctor.name}</p>
                        </div>
                    ))}

                    {filteredDoctors.length === 0 && (
                        <p className={cx("no-result")}>Không tìm thấy bác sĩ</p>
                    )}
                </div>
            </div>

            {/* Hiển thị content-chat nếu đã chọn bác sĩ */}
            {selectedDoctor && (
                <div className={cx('chat')}>
                    <div className={cx('header')}>
                        <img src={selectedDoctor.image} alt={selectedDoctor.name} className={cx('doctor-img')} />
                        <a href={`/doctor/${selectedDoctor.id}`} className={cx('info')}>
                            <p className={cx('doctor-name')}>{selectedDoctor.name}</p>
                            <p className={cx('activity')}>{selectedDoctor.activity}</p>
                        </a>
                    </div>
                    <div className={cx('content-chat')}>
                        <div className={cx('message-item', 'me')}>
                            <p className={cx('message-content')}>Hello</p>
                        </div>
                        <div className={cx('message-item', 'doctor')}>
                            <img src={selectedDoctor.image} alt={selectedDoctor.name} className={cx('doctor-img')} />
                            <p className={cx('message-content')}>Hi</p>
                        </div>
                        <div className={cx('message-item', 'me')}>
                            <p className={cx('message-content')}>Fuck Do an</p>
                        </div>
                        <div className={cx('message-item', 'doctor')}>
                            <img src={selectedDoctor.image} alt={selectedDoctor.name} className={cx('doctor-img')} />
                            <p className={cx('message-content')}>Me too</p>
                        </div>
                    </div>
                    <div className={cx('input')}>
                        <img src={images.image_chat} alt="Image" className={cx('image')}/>
                        <input type="text" placeholder="Type a message" className={cx('input-message')} />
                        <img src={images.face_smile_solid} alt="Icon" className={cx('icon')}/>
                        <img src={images.paper_plane} alt="Send" className={cx('send')}/>
                    </div>
                    
                </div>
            )}

            {/* Hiển thị more-info nếu đã chọn bác sĩ */}
            {selectedDoctor && (
                <div className={cx('more-info')}>
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} className={cx('doctor-img')} />
                    <p className={cx('doctor-name')}>{selectedDoctor.name}</p>
                    <p className={cx('activity')}>{selectedDoctor.activity}</p>
                    <a href={`/doctor/${selectedDoctor.id}`} className={cx('profile')}>
                        <img src={images.user} alt="User" className={cx('user')} />
                        <p>Trang cá nhân</p>
                    </a>
                </div>
            )}
        </main>
    );
}

export default Messages;
