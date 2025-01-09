import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./ManagePatient.module.scss";
import {useNavigate} from "react-router-dom";
import {GetConnectingUsers, GetAllConsultationByPatientIdAndDoctorId, UpdateConsultationResult} from "../../services/ApiService";
import {GetUser} from "../../services/UserStorageService";
const cx = classNames.bind(styles);

const patients = [
  {
    id: 1,
    email: "abc@gmail.com",
    fullname: "Nguyen Van A",
    phonenumber: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    birthday: "1993-05-15",
    avatarpath: images.avt1,
    hasHealthInsurance: true,
  },
  {
    id: 2,
    email: "123@gmail.com",
    fullname: "Tran Thi B",
    phonenumber: "0987654321",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    birthday: "1998-07-20",
    avatarpath: images.avt2,
    hasHealthInsurance: false,
  },
  {
    id: 3,
    email: "kkk@gmail.com",
    fullname: "Le Van C",
    phonenumber: "0932123456",
    address: "789 Đường DEF, Quận 5, TP.HCM",
    birthday: "1985-11-02",
    avatarpath: images.avt3,
    hasHealthInsurance: true,
  },
  {
    id: 4,
    email: "999@gmail.com",
    fullname: "Pham Thi D",
    phonenumber: "0912345678",
    address: "101 Đường GHI, Quận 7, TP.HCM",
    birthday: "2000-02-10",
    avatarpath: images.avt1,
    hasHealthInsurance: false,
  },
  {
    id: 5,
    email: "loaaa@gmail.com",
    fullname: "Nguyen Van E",
    phonenumber: "0987654321",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    birthday: "1998-07-20",
    avatarpath: images.avt2,
    hasHealthInsurance: false,
  },
  {
    id: 6,
    email: "ooo@gmail.com",
    fullname: "Le Van F",
    phonenumber: "0932123456",
    address: "789 Đường DEF, Quận 5, TP.HCM",
    birthday: "1985-11-02",
    avatarpath: images.avt3,
    hasHealthInsurance: true,
  },
];

const appointments = {
  1: [
    { date: "2024-12-23", time: "10:00 AM", notes: "General Checkup" },
    { date: "2024-12-30", time: "2:00 PM", notes: "Follow-up" },
    { date: "2025-01-06", time: "9:00 AM", notes: "Blood Test" },
  ],
  2: [
    { date: "2024-12-24", time: "2:00 PM", notes: "Dental Checkup" },
    { date: "2024-12-29", time: "11:00 AM", notes: "General Consultation" },
    { date: "2025-01-03", time: "10:30 AM", notes: "Vaccination" },
  ],
  3: [
    { date: "2024-12-25", time: "11:00 AM", notes: "Eye Exam" },
    { date: "2025-01-05", time: "9:30 AM", notes: "Routine Checkup" },
    { date: "2025-01-07", time: "3:00 PM", notes: "Physical Therapy" },
  ],
  4: [
    { date: "2024-12-25", time: "11:00 AM", notes: "Eye Exam" },
    { date: "2025-01-05", time: "9:30 AM", notes: "Routine Checkup" },
    { date: "2025-01-07", time: "3:00 PM", notes: "Physical Therapy" },
  ],
  5: [
    { date: "2024-12-25", time: "11:00 AM", notes: "Eye Exam" },
    { date: "2025-01-05", time: "9:30 AM", notes: "Routine Checkup" },
    { date: "2025-01-07", time: "3:00 PM", notes: "Physical Therapy" },
  ],
  6: [
    { date: "2024-12-25", time: "11:00 AM", notes: "Eye Exam" },
    { date: "2025-01-05", time: "9:30 AM", notes: "Routine Checkup" },
    { date: "2025-01-07", time: "3:00 PM", notes: "Physical Therapy" },
  ],
};

function ManagePatient() {
  const currentUser = GetUser();
  const navigation = useNavigate();
  const [selectedManagement, setSelectedManagement] = useState(null);
  const [managementList, setManagementList] = useState([]);
  const [selectedConsultationHistory, setSelectedConsultationHistory] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showUpdateDiagnosis, setShowUpdateDiagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  useEffect(() => {
    GetConnectingUsers(currentUser.id,currentUser.userRole).then((data) => {
      setManagementList(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleSelectManagement = (management) => {
    setSelectedManagement(management);
    GetAllConsultationByPatientIdAndDoctorId(management.opponent.id,currentUser.id,"Done").then((data) => {
        setSelectedConsultationHistory(data);
    })
    .catch((error) => {
        console.error(error);
    });
  }
  const handlePrescribe = (item) => {
    navigation("/doctor-drug", { state: { consultation: item, patient: selectedManagement.opponent } });
  }
  const handleUpdateDiagnosis = (item) => {
    setSelectedConsultation(item);
    setShowUpdateDiagnosis(true);
  }
  const handleCloseUpdateDiagnosis = () => {
      setShowUpdateDiagnosis(false);
  }
  const SaveDiagnosis = async () => {
    const response = await UpdateConsultationResult(selectedConsultation.consultationId, diagnosis);
    if(response === "updated")
    {
      setShowUpdateDiagnosis(false);
      alert("Update diagnosis successfully");
      setSelectedConsultationHistory(selectedConsultationHistory.filter((item) =>{
        if(item.consultationId !== selectedConsultation.consultationId){
          return item;
        }
        else{
          item.consultationResult = diagnosis;
            return item;
        }
      }));
      setSelectedConsultation(null);
      setDiagnosis("");
    }
  }
  return (
    <div className={cx("container")}>
      <div className={cx("column", "patients-list")}>
        <h3 className={cx("title")}>Patient List</h3>
        <ul className={cx("list")}>
          {managementList.map((management) => (
            <li
              key={management.opponent.id}
              className={cx("list-item", {
                active: selectedManagement?.opponent.id === management.opponent.id,
              })}
              onClick={() => handleSelectManagement(management)}
            >
              {management.opponent.fullName}
            </li>
          ))}
        </ul>
      </div>

      <div className={cx("column", "patient-details")}>
        <h3 className={cx("title")}>Information details</h3>
        {selectedManagement ? (
          <div>
            <img
              src={images.avt1}
              alt={selectedManagement.opponent.fullName}
              className={cx("avatar")}
            />
            <p>
              <strong>Full Name:</strong> {selectedManagement.opponent.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedManagement.opponent.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedManagement.opponent.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {selectedManagement.opponent.address}
            </p>
            <p>
              <strong>BirthDay:</strong> {selectedManagement.opponent.birthDay}
            </p>
          </div>
        ) : (
          <p>Please select a patient.</p>
        )}
      </div>

      <div className={cx("column", "appointments")}>
        <h3 className={cx("title")}>Consultation History</h3>
        {selectedManagement ? (
          selectedConsultationHistory?.length ? (
            <ul className={cx("list")}>
              {selectedConsultationHistory.map((item) => (
                  <li key={item.consultationId} className={cx("list-item")}>
                    <p>
                      <strong>Date:</strong> {item.consultationDate}
                    </p>
                    <p>
                      <strong>Duration:</strong> {item.startTime} - {item.endTime}
                    </p>
                    <p>
                      <strong>Symptom:</strong> {item.reason === "" ? "None" : item.reason}
                    </p>
                    <p>
                      <strong>Diagnosis:</strong> {item.consultationResult === "" ? "None" : item.consultationResult}
                    </p>
                    <div className={cx("commands-btn")}>
                      <button className={cx("btn")} onClick={() => handlePrescribe(item)}>Prescribe</button>
                      <button className={cx("btn")} onClick={() => handleUpdateDiagnosis(item)}>Update Diagnosis</button>
                    </div>
                  </li>
              ))}
            </ul>
          ) : (
              <p>No appointments available.</p>
          )
        ) : (
            <p>Please select a patient to view consultation history.</p>
        )}
      </div>
      {showUpdateDiagnosis && (
          <div className={cx("update-diagnosis-dialog")}>
            <div className={cx("update-diagnosis-dialog-content")}>
              <h2 className={cx("popup-title")}>Update Diagnosis</h2>
              <button className={cx("btn-close")} onClick={handleCloseUpdateDiagnosis}> Close</button>
              <div className={cx("update-diagnosis-form")}>
                    <div className={cx("form-group")}>
                      <label htmlFor="diagnosis">Diagnosis</label>
                      <textarea id="diagnosis" name="diagnosis" onChange={(e) => setDiagnosis(e.target.value)} rows="4" cols="50" placeholder="Enter diagnosis"></textarea>
                    </div>
                    <button className={cx("btn-submit")} onClick={SaveDiagnosis}>Update</button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

export default ManagePatient;
