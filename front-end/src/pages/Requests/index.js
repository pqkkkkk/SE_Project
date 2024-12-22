import classNames from "classnames/bind";
import styles from "./Requests.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(styles);

function Requests() {
    const [requests, setRequests] = useState([
        {
            id: 1,
            fullName: "David Becker",
            requestDate: "2024-12-20",
            startTime: "09:00",
            endTime: "10:00",
            status: "Done",
        },
        {
            id: 2,
            fullName: "John Doe",
            requestDate: "2024-12-21",
            startTime: "10:00",
            endTime: "11:00",
            status: "Accepted",
        },
        {
            id: 3,
            fullName: "Mary Johnson",
            requestDate: "2024-12-20",
            startTime: "13:00",
            endTime: "14:00",
            status: "Accepted",
        },
        {
            id: 4,
            fullName: "Tom Smith",
            requestDate: "2024-12-20",
            startTime: "15:00",
            endTime: "16:00",
            status: "Missed",
        },
        {
            id: 5,
            fullName: "Alice Brown",
            requestDate: "2024-12-19",
            startTime: "17:00",
            endTime: "18:00",
            status: "Done",
        },
        {
            id: 6,
            fullName: "Jane Williams",
            requestDate: "2024-12-21",
            startTime: "19:00",
            endTime: "20:00",
            status: "New",
        },
    ]);

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRequestClick = (request) => {
        if (request.status.toLowerCase() === "new") {
            setSelectedRequest(request);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [dropdownVisible, setDropdownVisible] = useState(null);

    const toggleDropdown = (field) => {
        setDropdownVisible((prev) => (prev === field ? null : field));
    };

    return (
        <main id={cx("requests")}>
            <div className={cx("content")}>
                <h1 className={cx("title")}>
                    List of medical examination requests
                </h1>

                <table className={cx("requests-table")}>
                    <thead className={cx("table-header")}>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>
                                <p>Request date</p>
                                <div className={cx("filter-container")}>
                                    <img
                                        src={images.filter}
                                        alt="Filter"
                                        className={cx("filter-icon")}
                                        onClick={() =>
                                            toggleDropdown("requestDate")
                                        }
                                    />
                                    {dropdownVisible === "requestDate" && (
                                        <ul className={cx("dropdown")}>
                                            <li>Ascending</li>
                                            <li>Descending</li>
                                        </ul>
                                    )}
                                </div>
                            </th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>
                                <p>Status</p>
                                <div className={cx("filter-container")}>
                                    <img
                                        src={images.filter}
                                        alt="Filter"
                                        className={cx("filter-icon")}
                                        onClick={() => toggleDropdown("status")}
                                    />
                                    {dropdownVisible === "status" && (
                                        <ul className={cx("dropdown")}>
                                            <li>Accepted</li>
                                            <li>Done</li>
                                            <li>Missed</li>
                                            <li>New</li>
                                        </ul>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className={cx("table-body")}>
                        {requests.map((request, index) => (
                            <tr
                                key={request.id}
                                onClick={() => handleRequestClick(request)}
                                className={
                                    request.status.toLowerCase() === "new"
                                        ? cx("clickable")
                                        : ""
                                }
                            >
                                <td>{index + 1}</td>
                                <td>{request.fullName}</td>
                                <td>{request.requestDate}</td>
                                <td>{request.startTime}</td>
                                <td>{request.endTime}</td>
                                <td
                                    className={cx(request.status.toLowerCase())}
                                >
                                    <div></div>
                                    <p>{request.status}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedRequest && (
                <div className={cx("modal-overlay")} onClick={handleCloseModal}>
                    <div
                        className={cx("modal-content")}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className={cx("modal-title")}>Patient's Request</h2>

                        <div className={cx("form-group")}>
                            <label>Patient:</label>
                            <p className={cx("patient-name")}>
                                {selectedRequest.fullName}
                            </p>
                        </div>

                        <div className={cx("form-group")}>
                            <label>Reason:</label>
                            <p className="request-reason">
                                I have been having persistent headaches for
                                about two weeks, the pain usually starts in the
                                morning and lasts throughout the day. The pain
                                tends to concentrate in the forehead and
                                temples, accompanied by symptoms of nausea and
                                sensitivity to light. In addition, I also feel
                                tired and cannot concentrate on daily work.
                            </p>
                        </div>

                        <div className={cx("form-group")}>
                            <label>Date:</label>
                            <p className={cx("appointment-date")}>
                                {selectedRequest.requestDate}
                            </p>
                        </div>

                        <div className={cx("form-group")}>
                            <label>Hours:</label>
                            <p className={cx("appointment-time")}>
                                {selectedRequest.startTime} -{" "}
                                {selectedRequest.endTime}
                            </p>
                        </div>

                        <div className={cx("modal-actions")}>
                            <button className={cx("btn-decline")}>
                                Refuse
                            </button>

                            <button className={cx("btn-accept")}>Agree</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Requests;
