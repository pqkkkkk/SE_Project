import classNames from "classnames/bind";
import styles from "./Schedule.module.scss";
import images from "../../assets/images";
import { useState } from "react";


const cx = classNames.bind(styles);


function Schedule() {

    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const schedules = [
        { id: 1, date: "2021-10-01", title: "Event 1", description: "Description 1", doctorID: 1 , patientID: 1, reason: "Bi dep trai qua" , startTime: "10:00AM", endTime: "11:00AM"},
        { id: 2, date: "2021-10-02", title: "Event 2", description: "Description 2", doctorID: 1 , patientID: 2, reason: "Reason 2", startTime: "10:00AM", endTime: "11:00AM" },
        { id: 3, date: "2021-10-03", title: "Event 3", description: "Description 3", doctorID: 1 , patientID: 3, reason: "Reason 3", startTime: "10:00AM", endTime: "11:00AM" },
        { id: 4, date: "2021-10-04", title: "Event 4", description: "Description 4", doctorID: 2 , patientID: 1, reason: "Reason 4", startTime: "10:00AM", endTime: "11:00AM" },
        { id: 5, date: "2021-10-05", title: "Event 5", description: "Description 5", doctorID: 2 , patientID: 2, reason: "Reason 5", startTime: "10:00AM", endTime: "11:00AM"},
        { id: 6, date: "2021-10-06", title: "Event 6", description: "Description 6", doctorID: 2 , patientID: 3, reason: "Reason 6", startTime: "10:00AM", endTime: "11:00AM" },
        { id: 7, date: "2021-10-07", title: "Event 7", description: "Description 7", doctorID: 3 , patientID: 1, reason: "Reason 7", startTime: "10:00AM", endTime: "11:00AM" },
        { id: 8, date: "2021-10-08", title: "Event 8", description: "Description 8", doctorID: 3 , patientID: 2, reason: "Reason 8", startTime: "10:00AM", endTime: "11:00AM" },
        { id: 9, date: "2021-10-09", title: "Event 9", description: "Description 9", doctorID: 3 , patientID: 3, reason: "Reason 9", startTime: "10:00AM", endTime: "11:00AM" },

    ]

    const doctors = [
        { id: 1, name: "Doctor 1"},
        { id: 2, name: "Doctor 2"},
        { id: 3, name: "Doctor 3"},
    ]

    const patients = [
        { id: 1, name: "Patient 1"},
        { id: 2, name: "Patient 2"},
        { id: 3, name: "Patient 3"},
    ]

    const handleSelectSchedule = (schedule) => {
        setSelectedSchedule(schedule);
    };

    const getDoctorName = (id) => {
        const doctor = doctors.find((doctor) => doctor.id === id);
        return doctor ? doctor.name : "Unknown Doctor";
    };

    const getPatientName = (id) => {
        const patient = patients.find((patient) => patient.id === id);
        return patient ? patient.name : "Unknown Patient";
    };

    return (
        <div className={cx("schedule")}>
            <div className={cx("schedule-header")}>
                <h1 className={cx("schedule__title")}>Schedule</h1>
            </div>

            <div className={cx("schedule-content")}>
                <div className={cx("schedule-list")}>
                    {schedules.map((schedule) => (
                        <div 
                            key={schedule.id} 
                            className={cx("schedule-item")}
                            onClick={() => handleSelectSchedule(schedule)}
                        >
                            <img className={cx("schedule-image")} src={images.schedule} alt="schedule" />
                            <div className={cx('sche-info')}>
                                    <p className={cx('schedule-id')}>ID: #{schedule.id}</p>
                                    <p className={cx('schedule-date')}>Date: {schedule.date}</p>
                            </div>

                        </div>
                    ))}
                </div>

                {selectedSchedule && (
                    <div className={cx("schedule-info")}>
                        <div className={cx("schedule-info_title")}>Schedule Information</div>
                        <div className={cx("schedule-info_item")}>
                            <div className={cx("doctor")}>
                                <p className={cx("header")}>Doctor</p>
                                <img src={images.doctorHomeSpecialist1} alt="doctor" className={cx('doctor-img')} />
                                <p className={cx("doctor-name")}>{getDoctorName(selectedSchedule.doctorID)}</p>
                            </div>

                            <div className={cx("doctor")}>
                                <p className={cx("header")}>Patient</p>
                                <img src={images.userAvatar} alt="doctor" className={cx('doctor-img')} />
                                <p className={cx("doctor-name")}>{getPatientName(selectedSchedule.patientID)}</p>
                            </div>
                        </div>

                        <div className={cx("schedule-reason")}>
                            <div className={cx("item")}>
                                <p className={cx("header")}>Reason:</p>
                                <p className={cx("text")}>{selectedSchedule.reason}</p>
                            </div>
                            <div className={cx("item")}>
                                <p className={cx("header")}>Start Time:</p>
                                <p className={cx("text")}>{selectedSchedule.startTime} - {selectedSchedule.endTime}</p>
                            </div>
                        </div>

                        <a href="/video-call" className={cx("btn-join")}>Join Consultation</a>
                    </div>
                )}
            </div>

            
                
            
        </div>

    );
}

export default Schedule;