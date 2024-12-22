import classNames from "classnames/bind";
import styles from "./FindDoctor.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {getAllDoctors} from "../../services/ApiService";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

function FindDoctor() {
  const navigate = useNavigate();
  /*const doctors = [
    { id: 1, name: "Dr. John Doe 1", speciality: "Cardiologist", review: 120 },
    { id: 2, name: "Dr. Jane Doe 2", speciality: "Dentist", review: 100 },
    { id: 3, name: "Dr. John Doe 3", speciality: "Dermatologist", review: 80 },
    { id: 4, name: "Dr. John Doe 4", speciality: "Neurologist", review: 90 },
    { id: 5, name: "Dr. John Doe 5", speciality: "Psychiatrist", review: 110 },
    { id: 6, name: "Dr. John Doe 6", speciality: "Cardiologist", review: 120 },
  ];
  */

  const [doctors, setDoctors] = useState([]);
  useEffect(() =>{
    getAllDoctors().then(data => setDoctors(data || []))
        .catch(error => console.log(error));
  });
  const handleDoctorClick = (id) => {
    navigate(`/doctor/${id}`);
  };
  return (
    <div className={cx("content")}>
      <h2 className={cx("desc")}>Search for Doctor , Make an Appointment</h2>
      <div className={cx("border")}></div>
      <div className={cx("page")}>
        <div className={cx("sidebar")}>
          <div className={cx("search", "element")}>
            <label className={cx("field-text")}>Search</label>
            <div className={cx("decor-input")}>
              <input
                className={cx("input")}
                type="text"
                placeholder="Search doctor"
              />
              <button className={cx("search-btn")}>Search</button>
            </div>
          </div>

          <form className={cx("filter", "element")} id="filter-form">
            <div className={cx("gender-options")}>
              <label className={cx("field-text")}>Gender of doctor</label>
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

            <div className={cx("speciality-options")}>
              <label htmlFor="speciality" className={cx("field-text")}>
                Speciality
              </label>
              <select
                id="speciality"
                className={cx("select-options")}
                name="speciality"
              >
                <option value="">All</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="dentist">Dentist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="neurologist">Neurologist</option>
                <option value="psychiatrist">Psychiatrist</option>
              </select>
            </div>

            <div className={cx("experience-options")}>
              <label htmlFor="experience" className={cx("field-text")}>
                Experience
              </label>
              <select
                id="experience"
                className={cx("select-options")}
                name="experience"
              >
                <option value="">All</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6+">6+ years</option>
              </select>
            </div>

            <button type="submit" className={cx("submit-btn")}>
              Show Doctors
            </button>
          </form>
        </div>
        <div className={cx("main-content")}>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={cx("doctor")}
              onClick={() => handleDoctorClick(doctor.id)}
            >
              <img src={images.doctorDefault} alt="doctor" />
              <h3>{doctor.fullName}</h3>
              <p className={cx("speciality")}>{doctor.speciality}</p>
              <p className={cx("review")}>{doctor.consultationPrice} reviews</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindDoctor;
