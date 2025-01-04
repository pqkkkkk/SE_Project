import classNames from "classnames/bind";
import styles from "./Schedule.module.scss";
import images from "../../assets/images";
import {useEffect, useState} from "react";
import {GetAllConsultations, UpdateAllMissedConsultations} from "../../services/ApiService";
import {GetUser} from "../../services/UserStorageService";
import {useNavigate} from "react-router-dom";
const cx = classNames.bind(styles);

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
function Schedule() {
    const navigate = useNavigate();
    const currentUser = GetUser();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentList, setAppointmentList] = useState([]);
    useEffect(() => {
        UpdateAllMissedConsultations(currentUser.id, currentUser.userRole)
            .then((data) =>{
                console.log(data);
                GetAllConsultations(currentUser.id, currentUser.userRole, "Accepted", null, null, null)
                    .then((data) => {
                        setAppointmentList(data || []);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);
    const handleSelectSchedule = (schedule) => {
        setSelectedAppointment(schedule);
    };
    const handleJoinRoom = () => {
        const date = selectedAppointment.consultationDate;
        const startTime = selectedAppointment.startTime;
        const endTime = selectedAppointment.endTime;
        const startDate = new Date(date + 'T' + startTime);
        const endDate = new Date(date + 'T' + endTime);
        const now = new Date();
        const timeDiffMinutes = (new Date(startDate) - now) / 60000;
        if(timeDiffMinutes > 10)
        {
            alert("You can only join the room 10 minutes before the appointment");
            window.location.reload();
            return;
        }
        if(new Date(endDate) < now){
            alert("The appointment has ended");
            window.location.reload();
            return;
        }
        navigate("/video-call",{state: {appointment: selectedAppointment}});
    }
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
                <h1 className={cx("schedule__title")}>Appointments</h1>
            </div>
            {appointmentList.length === 0 &&
                (<div className={cx("empty-appointment-text")}>
                    <h2> You don't have any consultation appointment....</h2>
                </div>)}
            <div className={cx("schedule-content")}>
                <div className={cx("schedule-list")}>
                    {appointmentList.map((appointment) => (
                        <div 
                            key={appointment.consultationId}
                            className={cx("schedule-item")}
                            onClick={() => handleSelectSchedule(appointment)}
                        >
                            <img className={cx("schedule-image")} src={images.schedule} alt="schedule" />
                            <div className={cx('sche-info')}>
                                    {currentUser.userRole ==='doctor' &&
                                        (<p className={cx('schedule-id')}>Patient : { appointment.patientName}</p>)}
                                    {currentUser.userRole ==="patient" &&
                                        (<p className={cx('schedule-id')}>Doctor : { appointment.doctorName}</p>)}
                                    <p className={cx('schedule-date')}>Date: {appointment.consultationDate}</p>
                            </div>

                        </div>
                    ))}
                </div>

                {selectedAppointment && (
                    <div className={cx("schedule-info")}>
                        <div className={cx("schedule-info_title")}>Schedule Information</div>
                        <div className={cx("schedule-info_item")}>
                            <div className={cx("doctor")}>
                                <p className={cx("header")}>Doctor</p>
                                <img src={images.doctorHomeSpecialist1} alt="doctor" className={cx('doctor-img')} />
                                <p className={cx("doctor-name")}>{selectedAppointment.doctorName}</p>
                            </div>

                            <div className={cx("doctor")}>
                                <p className={cx("header")}>Patient</p>
                                <img src={images.userAvatar} alt="doctor" className={cx('doctor-img')} />
                                <p className={cx("doctor-name")}>{selectedAppointment.patientName}</p>
                            </div>
                        </div>

                        <div className={cx("schedule-reason")}>
                            <div className={cx("item")}>
                                <p className={cx("header")}>Reason:</p>
                                <p className={cx("text")}>{selectedAppointment.reason}</p>
                            </div>
                            <div className={cx("item")}>
                                <p className={cx("header")}>Duration:</p>
                                <p className={cx("text")}>{selectedAppointment.startTime} - {selectedAppointment.endTime}</p>
                            </div>
                        </div>

                        <button onClick={handleJoinRoom} className={cx("btn-join")}>Join Room</button>
                    </div>
                )}
            </div>

            
                
            
        </div>

    );
}

export default Schedule;