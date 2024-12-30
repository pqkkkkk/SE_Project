import classNames from "classnames/bind";
import styles from "./FormBookDoctor.module.scss";
import images from "../../assets/images";
import { GetUser } from "../../services/UserStorageService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreateConsultation } from "../../services/ApiService";
const cx = classNames.bind(styles);

function FormBookDoctor() {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [doctor, setDoctor] = useState({});
  const [reason, SetReason] = useState("");
  useEffect(() => {
    setUser(GetUser() || {});
    setDoctor(location.state.doctor || {});
  }, []);

  const HandleSendingConsultationRequest = async () => {
    const consultation = {
      ConsultationDate: new Date().toISOString(),
      startTime: "08:00:00",
      endTime: "09:00:00",
      form: "Online",
      reason: reason,
      status: "New",
      patientId: user.id,
      doctorId: doctor.id,
      consultationResult: "",
    };
    const response = await CreateConsultation(consultation);
    if (response === "success") {
      alert("Consultation request sent successfully!");
    } else {
      alert("Failed to send consultation request!");
    }
  };
  return (
    <div className={cx("content")}>
      <div className={cx("doctor")}>
        <div className={cx("doctor-info")}>
          <div className={cx("image-doctor")}>
            <img src={images.doctorImage} alt="doctor" />
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
            <input type="radio" name="price-option" value="price" />
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
          <h1 className={cx("note")}>
            Please write your Full Name clearly, capitalizing the first letters,
            for example: Duong Tuan Khanh
          </h1>
        </div>
        <div className={cx("gender-options")}>
          <label className={cx("field-text")}>Gender</label>
          <div className={cx("decor-gender")}>
            <label>
              <input type="radio" name="gender" value="male" />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" />
              Female
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
              className={cx("input")}
              type="text"
              placeholder="Date of birth (required)"
            />
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("city-options")}>
            <label htmlFor="city" className={cx("field-text")}>
              City
            </label>
            <select id="city" className={cx("select-options")} name="city">
              <option value="">All</option>
              <option value="hanoi">Ha Noi</option>
              <option value="hochiminh">Ho Chi Minh</option>
              <option value="danang">Da Nang</option>
            </select>
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
              placeholder="Reason for medical examination"
            />
          </div>
        </div>
      </div>
      <div className={cx("total-container")}>
        <div className={cx("total-payment")}>
          <div className={cx("examination-price")}>
            <h1>Examination Price</h1>
            <p>$300</p>
          </div>
          <div className={cx("booking-fee")}>
            <h1>Booking Fee</h1>
            <p>Free</p>
          </div>
          <hr></hr>
          <div className={cx("total")}>
            <h1>Total</h1>
            <p>$300</p>
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
        <button onClick={HandleSendingConsultationRequest}>Send Request</button>
      </div>
    </div>
  );
}
export default FormBookDoctor;
