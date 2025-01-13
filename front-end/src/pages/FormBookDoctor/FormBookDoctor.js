import classNames from "classnames/bind";
import styles from "./FormBookDoctor.module.scss";
import images from "../../assets/images";
import { GetUser } from "../../services/UserStorageService";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {CreateConsultation, GetAllConsultations} from "../../services/ApiService";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
const cx = classNames.bind(styles);

function FormBookDoctor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [doctor, setDoctor] = useState({});
  const [reason, SetReason] = useState("");
  const [startTime, setStartTime] = useState("-1:00:00");
  const [endTime, setEndTime] = useState("-1:00:00");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [dialogResolve, setDialogResolve] = useState(null);
  useEffect(() => {
    setUser(GetUser() || {});
    setDoctor(location.state.doctor || {});
  }, []);

  const handleSelectStartTime = (e) => {
    setStartTime(e.target.value);
    const time = e.target.value.split(":");
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);
    const newHour = hour + 1;
    const newTime = `${String(newHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
    setEndTime(newTime);
  }
  const showConfirmDialog = () => {
    setOpenConfirmDialog(true);
    return new Promise((resolve) => {
      setDialogResolve(() => resolve);
    });
  }
  const handleConfirm = () =>{
    setOpenConfirmDialog(false);
    if(dialogResolve) {
      dialogResolve(true);
    }
  }
  const handleCancel = () => {
    setOpenConfirmDialog(false);
    if(dialogResolve) {
      dialogResolve(false);
    }
  }
  const CheckBeforeSendingConsultationRequest = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    if(startTime === "-1:00:00" && endTime === "-1:00:00") {
      return "Select valid start time!";
    }

    const sameDayConsultationList =  await GetAllConsultations(user.id, user.userRole, "Accepted", today, null, null);
    if(sameDayConsultationList.length !== 0) {
      const sameTimeConsultationCountList = sameDayConsultationList.filter((consultation) => {
          return consultation.startTime === startTime && consultation.endTime === endTime;
      });
      if(sameTimeConsultationCountList.length > 0) {
          return "You have already have a consultation appointment at this time!";
    }}

    const sameDayNewConsultationList =  await GetAllConsultations(user.id, user.userRole, "New", today, null, null);
    if(sameDayNewConsultationList.length !== 0) {
      const sameTimeNewConsultationCountList = sameDayNewConsultationList.filter((consultation) => {
          return consultation.startTime === startTime && consultation.endTime === endTime;
      });
      if(sameTimeNewConsultationCountList.length > 0) {
          const userConfirm = await showConfirmDialog();
          if(userConfirm === false) {
            return "You canceled sending consultation request!";
          }
          else{
            return "ok";
          }
      }
    }
    return "ok";
  };
  const SendConsultationRequest = async () => {
    const checkResult = await CheckBeforeSendingConsultationRequest();
    if(checkResult === "ok") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const today = `${year}-${month}-${day}`;

      const consultation = {
        ConsultationDate: today,
        startTime: startTime,
        endTime: endTime,
        form: "online",
        reason: reason,
        status: "New",
        patientId: user.id,
        doctorId: doctor.id,
        consultationResult: "",
      };
      const response = await CreateConsultation(consultation);
      if (response === "success") {
        alert("Consultation request sent successfully. Waiting for doctor accept this!");
        navigate("/find-doctor");
      } else {
        alert("Failed to send consultation request!");
      }
    }
    else{
      alert(checkResult);
    }
  };
  return (
    <div className={cx("content")}>
      <div className={cx("doctor")}>
        <div className={cx("doctor-info")}>
          <div className={cx("image-doctor")}>
            <img src={doctor.gender === 'Female' ? images.doctorImage : images.doctorDefault} alt="doctor" />
            <div className={cx("rate")}>
              <img src={images.star} alt="star" />
              <span>{doctor.rating}</span>
            </div>
          </div>
          <div className={cx("doctor-detail")}>
            <div className={cx("name")}>
              <h1>{doctor.fullName}</h1>
              <p>Specialist of implants and cosmetic dentistry</p>
            </div>
            <div className={cx("location")}>
              <div className={cx("info")}>
                <img src={images.location} alt="location" />
                <h1>{doctor.address}</h1>
              </div>
              <p className={cx("detail")}>
                Kwame Nkrumah Circle , Accra Ghana lorem ipsum dolor sit amet,
                constnene afipesing elie, sed ddeelkj
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("form-booking")}>
        <div className={cx("price-booking")}>
          <label>
            <input type="radio" name="price-option" value="price"/>
            Price :{doctor.consultationPrice}
          </label>
        </div>
        <div className={cx("input-fullname")}>
          <label className={cx("field-text")}>Full Name</label>
          <div className={cx("decor-input")}>
            <input
                className={cx("input")}
                type="text"
                value={user.fullName}
                placeholder="Input your full name (required)"
            />
          </div>
        </div>
        <div className={cx("gender-options")}>
          <label className={cx("field-text")}>Gender</label>
          <div className={cx("decor-gender")}>
            <label>
              <input type="radio" name="gender" value={doctor.gender}/>
              Male
            </label>
          </div>
        </div>
        <div className={cx("input-phone")}>
          <label className={cx("field-text")}>Phone Number</label>
          <div className={cx("decor-input")}>
            <input
                className={cx("input")}
                type="text"
                value={user.phoneNumber}
                placeholder="Input your phone number"
            />
          </div>
        </div>
        <div className={cx("input-email")}>
          <label className={cx("field-text")}>Email Address</label>
          <div className={cx("decor-input")}>
            <input
                className={cx("input")}
                type="text"
                value={user.email}
                placeholder="Input your email address"
            />
          </div>
        </div>
        <div className={cx("input-birthday")}>
          <label className={cx("field-text")}>BirthDay</label>
          <div className={cx("decor-input")}>
            <input
                value={user.birthDay}
                className={cx("input")}
                type="text"
                placeholder="Date of birth (required)"
            />
          </div>
        </div>
        <div className={cx("input-address")}>
          <label className={cx("field-text")}>Address</label>
          <div className={cx("decor-input")}>
            <input
                className={cx("input")}
                type="text"
                value={user.address}
                placeholder="Input your address"
            />
          </div>
        </div>
        <div className={cx("input-reason")}>
          <label className={cx("field-text")}>Reason</label>
          <div className={cx("decor-input")}>
            <input
                className={cx("input")}
                type="text"
                value={reason}
                onChange={(e) => SetReason(e.target.value)}
                placeholder="Reason for medical examination.Can be left blank"
            />
          </div>
        </div>
        <div className={cx("input-start-time")}>
          <label className={cx("field-text")}>Start Time</label>
          <div className={cx("decor-input")}>
            <select className={cx("select-options")} value={startTime} onChange={(e) => handleSelectStartTime(e)}>
              <option value="-1:00:00">Select start Time</option>
              <option value="00:00:00">00:00:00</option>
              <option value="01:00:00">01:00:00</option>
              <option value="02:00:00">02:00:00</option>
              <option value="03:00:00">03:00:00</option>
              <option value="04:00:00">04:00:00</option>
              <option value="05:00:00">05:00:00</option>
              <option value="06:00:00">06:00:00</option>
              <option value="07:00:00">07:00:00</option>
              <option value="08:00:00">08:00:00</option>
              <option value="09:00:00">09:00:00</option>
              <option value="10:00:00">10:00:00</option>
              <option value="11:00:00">11:00:00</option>
              <option value="12:00:00">12:00:00</option>
              <option value="13:00:00">13:00:00</option>
              <option value="14:00:00">14:00:00</option>
              <option value="15:00:00">15:00:00</option>
              <option value="16:00:00">16:00:00</option>
              <option value="17:00:00">17:00:00</option>
              <option value="18:00:00">18:00:00</option>
              <option value="19:00:00">19:00:00</option>
              <option value="20:00:00">20:00:00</option>
              <option value="21:00:00">21:00:00</option>
              <option value="22:00:00">22:00:00</option>
              <option value="23:00:00">23:00:00</option>
            </select>
          </div>
        </div>
        <div className={cx("input-end-time")}>
          <label className={cx("field-text")}>End Time</label>
          <div className={cx("decor-input")}>
            <select disabled={true} className={cx("select-options")} value={endTime}>
              <option value={endTime}>{endTime}</option>
            </select>
          </div>
        </div>
      </div>
      <div className={cx("request")}>
        <p>
          Please fill in all information to save time in medical examination
          procedures.
        </p>
      </div>
      <div className={cx("confirm-btn")}>
        <button onClick={SendConsultationRequest}>Send Request</button>
      </div>
      <Dialog open={openConfirmDialog} >
            <DialogTitle>Reminder</DialogTitle>
            <DialogContent>
                <DialogContentText>You have already have a consultation request which is waiting for doctor accept in this time. Do you want to continue?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleConfirm} color="primary">Still send request</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default FormBookDoctor;
