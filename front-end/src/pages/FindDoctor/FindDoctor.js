import classNames from "classnames/bind";
import styles from "./FindDoctor.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {getAllDoctors} from "../../services/ApiService";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

// const doctors = [
//   { id: 1, fullName: "Dr. John Doe 1", speciality: "Cardiologist", consultationPrice: 120 },
//   { id: 2, fullName: "Dr. Jane Doe 2", speciality: "Dentist", consultationPrice: 100 },
//   { id: 3, fullName: "Dr. John Doe 3", speciality: "Dermatologist", consultationPrice: 80 },
//   { id: 4, fullName: "Dr. John Doe 4", speciality: "Neurologist", consultationPrice: 90 },
//   { id: 5, fullName: "Dr. John Doe 5", speciality: "Psychiatrist", consultationPrice: 110 },
//   { id: 6, fullName: "Dr. John Doe 6", speciality: "Cardiologist", consultationPrice: 120 },
// ];
function FindDoctor() {
  const navigate = useNavigate();
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState("");
  const [searchName, setSearchName] = useState("");
  useEffect(() =>{
    getAllDoctors().then(data => {
      setDoctors(data || []);
      setFilteredDoctors(data || []);
    })
        .catch(error => console.log(error));
  }, []);
  
  const handleDoctorClick = (id) => {
    navigate(`/doctor/${id}`);
  };

  const handleFilterDoctorList = (e) => {
    e.preventDefault();
    setFilteredDoctors(doctors.filter(doctor => {
        return (doctor.fullName.toLowerCase().includes(searchName.toLowerCase()) || searchName === "")
            && (doctor.speciality === speciality || speciality === "")
            && (doctor.experienceYear === experience || experience === "")
            && (doctor.gender === gender || gender === "");
    }));
  }
    const handleResetFilter = () => {
      document.getElementById("filter-form").reset();
      setSpeciality("");
      setExperience("");
      setGender("");
      setSearchName("");
      setFilteredDoctors(doctors);
    }
  return (
    <div className={cx("content")}>
      <h2 className={cx("desc")}>Search for Doctor , Make an Appointment</h2>
      <div className={cx("border")}></div>
      <div className={cx("page")}>
        <div className={cx("sidebar")}>
          <div className={cx("search", "element")}>
            <label className={cx("field-text")}>Name</label>
            <div className={cx("decor-input")}>
              <input
                value={searchName}
                className={cx("input")}
                type="text"
                placeholder="Type doctor name"
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
          </div>

          <form className={cx("filter", "element", { active: isFilterVisible })} id="filter-form">
            <div className={cx("gender-options")}>
              <label className={cx("field-text")}>Gender</label>
              <select
                  value={gender}
                  id="gender"
                  className={cx("select-options")}
                  name="gender"
                  onChange={(e) => setGender(e.target.value)}>
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className={cx("speciality-options")}>
              <label htmlFor="speciality" className={cx("field-text")}>
                Speciality
              </label>
              <select
                  value={speciality}
                  id="speciality"
                  className={cx("select-options")}
                  name="speciality"
                  onChange={(e) => setSpeciality(e.target.value)}>
                <option value="">All</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Denstistry">Denstistry</option>
                <option value="Dermatology">Dermatology</option>
                <option value="General">General</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <div className={cx("experience-options")}>
              <label htmlFor="experience" className={cx("field-text")}>
                Experience
              </label>
              <select
                  value={experience}
                  id="experience"
                  className={cx("select-options")}
                  name="experience"
                  onChange={(e) =>{ setExperience(e.target.value)}}>
                <option value="">All</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6+">6+ years</option>
              </select>
            </div>
            <div className={cx("command-options")}>
              <button type="submit" className={cx("submit-btn")} onClick={handleFilterDoctorList}> Filter </button>
              <button type="reset" className={cx("reset-btn")} onClick={handleResetFilter}> Reset </button>
            </div>
          </form>


        </div>
        <div className={cx("main-content")}>
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={cx("doctor")}
              onClick={() => handleDoctorClick(doctor.id)}
            >
              <img src={images.doctorDefault} alt="doctor" />
              <h3>{doctor.fullName}</h3>
              <p className={cx("speciality")}>{doctor.speciality}</p>
              <p className={cx("review")}>Fee: {doctor.consultationPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindDoctor;
