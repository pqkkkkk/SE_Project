import classNames from "classnames/bind";
import styles from "./Requests.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {GetAllConsultations, UpdateConsultationStatus, DeleteConsultation} from "../../services/ApiService";
import { GetUser } from "../../services/UserStorageService";
import {render} from "@testing-library/react";
const cx = classNames.bind(styles);

const requestsMockData = [
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
    ];
function Requests() {
    const [requestsData, setRequestsData] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentUser = GetUser();
    useEffect(() => {
        GetAllConsultations(currentUser.id, currentUser.userRole, null, null,null,null).then((data) => {
            setRequestsData(data || []);
            setRequests(data || []);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);
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
    const handleStatusFilter = (e) => {
        const status = e.target.innerText.toLowerCase();
        if (status === "all") {
            setRequests(requestsData);
            return;
        }
        if (status === "accepted") {
            setRequests(requestsData.filter((request) => request.status === "Accepted"));
        } else if (status === "done") {
            setRequests(requestsData.filter((request) => request.status === "Done"));
        } else if (status === "missed") {
            setRequests(requestsData.filter((request) => request.status === "Missed"));
        } else if (status === "new") {
            setRequests(requestsData.filter((request) => request.status === "New"));
        }
    }
    const handleAcceptConsultation = async () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;

        const sameDayConsultationList =  await GetAllConsultations(currentUser.id, currentUser.userRole, "Accepted", today, null, null);
        if(sameDayConsultationList.length !== 0) {
            const sameTimeConsultationCount = sameDayConsultationList.filter((consultation) => {
                return consultation.startTime === selectedRequest.startTime && consultation.endTime === selectedRequest.endTime;
            });
            if (sameTimeConsultationCount.length > 0) {
                alert("You have already have a consultation appointment at this time!");
                window.location.reload();
                return;
            }
        }

        UpdateConsultationStatus(selectedRequest.consultationId, "Accepted")
            .then(() => {
                requestsData.find((request) => request.consultationId === selectedRequest.consultationId).status = "Accepted";
                setRequests((prev) =>
                    prev.map((request) =>
                        request.consultationId === selectedRequest.consultationId
                            ? { ...request, status: "Accepted" }
                            : request
                    )
                );
                alert("Consultation accepted successfully");
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to accept consultation");
            });
        }

    const handleRefuseConsultation = () => {
        DeleteConsultation(selectedRequest.consultationId).then(() => {
            setRequestsData((prev) =>
                prev.filter((request) => request.consultationId !== selectedRequest.consultationId)
            );
            setRequests((prev) =>
                prev.filter((request) => request.consultationId !== selectedRequest.consultationId)
            );
            alert("Consultation refused successfully");
            setIsModalOpen(false);
        })
        .catch((error) => {
            console.error(error);
            alert("Failed to refuse consultation");
        });
    }
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
                            <th>Patient Name</th>
                            <th>
                                <p>Date</p>
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
                                        <ul onClick={handleStatusFilter}  className={cx("dropdown")}>
                                            <li>All</li>
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
                                key={request.consultationId}
                                onClick={() => handleRequestClick(request)}
                                className={
                                    request.status.toLowerCase() === "new"
                                        ? cx("clickable")
                                        : ""
                                }
                            >
                                <td>{request.consultationId}</td>
                                <td>{ currentUser.userRole === "doctor" ? request.patientName : request.doctorName}</td>
                                <td>{request.consultationDate}</td>
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
                                {selectedRequest.patientId}
                            </p>
                        </div>

                        <div className={cx("form-group")}>
                            <label>Reason:</label>
                            <p className="request-reason">
                                {selectedRequest.reason}
                            </p>
                        </div>

                        <div className={cx("form-group")}>
                            <label>Date:</label>
                            <p className={cx("appointment-date")}>
                                {selectedRequest.consultationDate}
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
                            <button onClick={handleRefuseConsultation} className={cx("btn-decline")}>
                                Refuse
                            </button>

                            <button onClick={handleAcceptConsultation} className={cx("btn-accept")}>Agree</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Requests;
