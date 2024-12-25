import React, { useState } from "react";
import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./ManagePatient.module.scss";

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
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className={cx("container")}>
      <div className={cx("column", "patients-list")}>
        <h3 className={cx("title")}>Patient List</h3>
        <ul className={cx("list")}>
          {patients.map((patient) => (
            <li
              key={patient.id}
              className={cx("list-item", {
                active: selectedPatient?.id === patient.id,
              })}
              onClick={() => setSelectedPatient(patient)}
            >
              {patient.fullname}
            </li>
          ))}
        </ul>
      </div>

      <div className={cx("column", "patient-details")}>
        <h3 className={cx("title")}>Information details</h3>
        {selectedPatient ? (
          <div>
            <img
              src={selectedPatient.avatarpath}
              alt={selectedPatient.fullname}
              className={cx("avatar")}
            />
            <p>
              <strong>FullName:</strong> {selectedPatient.fullname}
            </p>
            <p>
              <strong>Email:</strong> {selectedPatient.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedPatient.phonenumber}
            </p>
            <p>
              <strong>Address:</strong> {selectedPatient.address}
            </p>
            <p>
              <strong>BirthDay:</strong> {selectedPatient.birthday}
            </p>
            <p>
              <strong>Health insurance:</strong>{" "}
              {selectedPatient.hasHealthInsurance ? "Có" : "Không"}
            </p>
          </div>
        ) : (
          <p>Please select a patient.</p>
        )}
      </div>

      <div className={cx("column", "appointments")}>
        <h3 className={cx("title")}>Appointment</h3>
        {selectedPatient ? (
          appointments[selectedPatient.id]?.length ? (
            <ul className={cx("list")}>
              {appointments[selectedPatient.id].map((appt, index) => (
                <li key={index} className={cx("list-item")}>
                  <p>
                    <strong>Date:</strong> {appt.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appt.time}
                  </p>
                  <p>
                    <strong>Note:</strong> {appt.notes}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments available.</p>
          )
        ) : (
          <p>Please select a patient to view appointment schedule.</p>
        )}
      </div>
    </div>
  );
}

export default ManagePatient;
