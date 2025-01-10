import classNames from "classnames/bind";
import styles from "./DetailDoctor.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {useParams}  from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserById, CreateFeedback, GetFeedbacksByDoctorId} from "../../services/ApiService";
import {GetUser} from "../../services/UserStorageService";

const cx = classNames.bind(styles);

const availableSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
];

function DetailDoctor() {
    const currentUser = GetUser();
    const navigate = useNavigate();
    const { id } = useParams();
    const [doctor, setDoctor] = useState({});
    const [feedbacks, setFeedbacks] = useState([]);
    const [ratingInput, setRatingInput] = useState(0);
    const [contentInput, setContentInput] = useState("");
  useEffect(() => {
      const fetchData = async () => {
           const [doctorData, feedbackData] = await Promise.all([
                getUserById(id),
                GetFeedbacksByDoctorId(id),
              ]);
           setDoctor(doctorData);
           setFeedbacks(feedbackData);
      }
        fetchData();
  }, []);
  
  const HandleBookAppointClick = () => {
    navigate("/book-appointment",{
        state: { doctor: doctor },
    });
  };
  const handleSendFeedback = async () => {
      if(contentInput === "" || ratingInput === 0){
            alert("Please fill in all fields");
            return;
      }
    const feedback = {
        patientId: currentUser.id,
        doctorId: doctor.id,
        rating: ratingInput,
        content: contentInput,
    };
    const response = await CreateFeedback(feedback);
    if(response === 1) {
        const newFeedback = {... feedback, patientName: currentUser.fullName};
        setFeedbacks([...feedbacks, newFeedback]);
        setContentInput("");
        setRatingInput(0);
    }
    else{
        alert("Failed to send feedback");
    }
  }
  const mockFeedbackData = [
    {
      username: "NguyenVanA",
      content: "The doctor is very enthusiastic and dedicated!",
      rating: 5,
    },
    {
      username: "TranThiB",
      content: "A bit slow but very clear explanation.",
      rating: 4,
    },
    {
      username: "LeVanC",
      content: "Not satisfied with the attitude.",
      rating: 2,
    },
    {
      username: "John Dae",
      content: "Great",
      rating: 4,
    },
    {
      username: "Adam Sen",
      content: "very good service",
      rating: 5,
    },
  ];
    return (
        <div className={cx("content")}>
            <div className={cx("doctor")}>
                <div className={cx("doctor-info")}>
                    <img src={images.doctorImage} alt="doctor"/>
                    <div className={cx("rate")}>
                        <img src={images.star} alt="star"/>
                        <span>{doctor.rating}</span>
                    </div>
                    <div className={cx("contact-options")}>
                        <button className={cx("calendar")} onClick={HandleBookAppointClick}>
                            <img src={images.calendar} alt="calendar"/>
                        </button>
                        <button className={cx("phone")}>
                            <img src={images.phone} alt="calendar"/>
                        </button>
                        <button className={cx("message")}>
                            <img src={images.message} alt="calendar"/>
                        </button>
                    </div>
                    <div className={cx("price")}>
                        <span>Price : {doctor.consultationPrice}</span>
                        <p>Online / Offline</p>
                    </div>
                    <div className={cx("tags")}>
                        <div className={cx("icon-friendly")}>
                            <img src={images.smile} alt="icon smile"/>
                            <span>Friendly</span>
                        </div>
                        <div className={cx("icon-listener")}>
                            <img src={images.ear} alt="icon ear"/>
                            <span>Good Listener</span>
                        </div>
                    </div>
                </div>
                <div className={cx("doctor-detail")}>
                    <div className={cx("name")}>
                        <h1>{doctor.fullName}</h1>
                        <p>Specialist of implants and cosmetic dentistry</p>
                    </div>
                    <div className={cx("location")}>
                        <div className={cx("info")}>
                            <img src={images.location} alt="location"/>
                            <h1>{doctor.address}</h1>
                        </div>
                        <p className={cx("detail")}>
                            Kwame Nkrumah Circle , Accra Ghana lorem ipsum dolor
                            sit amet, constnene afipesing elie, sed ddeelkj
                        </p>
                    </div>
                    <div className={cx("specialities")}>
                        <h1 className={cx("title")}>Specialities</h1>
                        <div className={cx("detail")}>
                            <div className={cx("text")}>{doctor.speciality}</div>
                            >
                        </div>
                    </div>
                    <div className={cx("issues")}>
                        <h1 className={cx("title")}>Issues</h1>
                        <div className={cx("detail")}>
                            <div className={cx("text")}>Oral Radiology</div>
                            <div className={cx("text")}>Implantology</div>
                            <div className={cx("text")}>Cosmetic Dentistry</div>
                        </div>
                    </div>
                    <div className={cx("qualification")}>
                        <h1 className={cx("title")}>Qualification</h1>
                        <p>
                            <span className={cx("bold-word")}>Licecnces:</span>
                            <span className={cx("word")}>
                                of implant and cosmetic dentistry
                            </span>
                        </p>
                    </div>
                    <div className={cx("experience")}>
                        <h1 className={cx("title")}>Experience</h1>
                        <p>
                            <span className={cx("bold-word")}>Licecnces:</span>
                            <span className={cx("word")}>
                                of implant and cosmetic dentistry
                            </span>
                            <span className={cx("color-word")}>
                                (15 years of Experience)
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={cx("container-review")}>
                <h2>Patient Reviews</h2>
                <div className={cx("feedback-list")}>
                    {feedbacks.length === 0 ? (
                        <p>There are no reviews yet.</p>
                    ) : (
                        <ul>
                            {feedbacks.map((review, index) => (
                                <li key={index} style={{marginBottom: "15px"}}>
                                    <strong>{review.patientName}</strong> -
                                    <span style={{color: "gold"}}>
                                        {" "}
                                        {"★".repeat(review.rating)}
                                    </span>
                                    <p>{review.content}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={cx("write-feedback")}>
                        <textarea
                            value={contentInput}
                            onChange={(e) => setContentInput(e.target.value)}
                            placeholder="Your feedback"
                            required
                        ></textarea>
                    <div className={cx("rating-and-submit")}>
                        <div className={cx("rating")}>
                            <input
                                onChange={(e) => setRatingInput(e.target.value)}
                                type="radio" id="star5" name="rating" value="5"/>
                            <label htmlFor="star5" title="5 stars">★</label>
                            <input
                                onChange={(e) => setRatingInput(e.target.value)}
                                type="radio" id="star4" name="rating" value="4"/>
                            <label htmlFor="star4" title="4 stars">★</label>
                            <input
                                onChange={(e) => setRatingInput(e.target.value)}
                                type="radio" id="star3" name="rating" value="3"/>
                            <label htmlFor="star3" title="3 stars">★</label>
                            <input
                                onChange={(e) => setRatingInput(e.target.value)}
                                type="radio" id="star2" name="rating" value="2"/>
                            <label htmlFor="star2" title="2 stars">★</label>
                            <input
                                onChange={(e) => setRatingInput(e.target.value)}
                                type="radio" id="star1" name="rating" value="1"/>
                            <label htmlFor="star1" title="1 star">★</label>
                        </div>
                        <button onClick={handleSendFeedback} >Send</button>
                    </div>
                </div>
            </div>
            <div className={cx("container-image")}>
                <img
                    className={cx("image")}
                    src={images.doctorImage3}
                    alt="doctor"/>
                <div className={cx("overlay")}></div>
            </div>
        </div>
    );
}

export default DetailDoctor;
