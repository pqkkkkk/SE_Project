import classNames from "classnames/bind";
import styles from "./DetailDoctor.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };
  const handleCallDoctor = () => {
    window.open(
      "/video-call",
      "VideoCallWindow",
      "width=800,height=600,scrollbars=no,resizable=no"
    );
  };
  const handleSlotSelection = (slot) => {
        navigate("/book-appointment", { state: { selectedSlot: slot } });
  };
  const reviews = [
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
                    <img src={images.doctorImage} alt="doctor" />
                    <div className={cx("rate")}>
                        <img src={images.star} alt="star" />
                        <span>5.0</span>
                    </div>
                    <div className={cx("contact-options")}>
                        <button className={cx("calendar")}>
                            <img src={images.calendar} alt="calendar" />
                        </button>
                        <button className={cx("phone")}>
                            <img src={images.phone} alt="calendar" />
                        </button>
                        <button className={cx("message")}>
                            <img src={images.message} alt="calendar" />
                        </button>
                    </div>
                    <div className={cx("price")}>
                        <span>$100 - $350</span>
                        <p>Online / Offline</p>
                    </div>
                    <div className={cx("time-slots")}>
                        <ul className={cx("slots-list")}>
                            {availableSlots.map((slot, index) => (
                                <li
                                    key={index}
                                    className={cx("slot-item")}
                                    onClick={() => handleSlotSelection(slot)}
                                >
                                    {slot}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cx("tags")}>
                        <div className={cx("icon-friendly")}>
                            <img src={images.smile} alt="icon smile" />
                            <span>Friendly</span>
                        </div>
                        <div className={cx("icon-listener")}>
                            <img src={images.ear} alt="icon ear" />
                            <span>Good Listener</span>
                        </div>
                    </div>
                    <div className={cx("icon-patient")}>
                        <img src={images.smile} alt="icon smile" />
                        <span>Patient</span>
                    </div>
                </div>
                <div className={cx("doctor-detail")}>
                    <div className={cx("name")}>
                        <h1>Dr. Annah Ray</h1>
                        <p>Specialist of implants and cosmetic dentistry</p>
                    </div>
                    <div className={cx("location")}>
                        <div className={cx("info")}>
                            <img src={images.location} alt="location" />
                            <h1>Accra, Ghana</h1>
                        </div>
                        <p className={cx("detail")}>
                            Kwame Nkrumah Circle , Accra Ghana lorem ipsum dolor
                            sit amet, constnene afipesing elie, sed ddeelkj
                        </p>
                    </div>
                    <div className={cx("specialities")}>
                        <h1 className={cx("title")}>Specialities</h1>
                        <div className={cx("detail")}>
                            <div className={cx("text")}>Oral Radiology</div>
                            <div className={cx("text")}>Implantology</div>
                            <div className={cx("text")}>Cosmetic Dentistry</div>
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
            <div className={cx("office")}>
                <div className={cx("office-info")}>
                    <div className={cx("title")}>
                        <span className={cx("t1")}> Office </span>
                        <span className={cx("t2")}>15 picture</span>
                    </div>
                    <img src={images.doctorImage2} alt="doctor" />
                </div>
                <div className={cx("office-detail")}>
                    <h1>About</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In enim lorem sit rhoncus ullamcorper. Dui lorem duis
                        amet vulputate. Nunc lobortis adipiscing faucibus diam
                        amet sed. Scelerisque mattis tincidunt mattis a. Risus
                        varius nunc sed ut amet in. Ut tristique vulputate ac
                        volutpat purus scelerisque ac id. Quis quam tellus,
                        adipiscing sit diam. Nibh ipsum nibh vitae, lacus arcu
                        metus mi at ultricies. Volutpat habitasse nunc aenean
                        risus. At suscipit suscipit magna est neque aliquam
                        facilisis eu. Nisi, nullam et in ipsum, mi dignissim
                        nec. Nibh nullam libero nibh suscipit montes, fringilla
                        donec quis. Feugiat amet amet tristique mauris hendrerit
                        dui integer.
                    </p>
                    <div className={cx("load-more")}>
                        <a href="/details">Load More</a>
                        <img src={images.expandless} alt="expand-less" />
                    </div>
                </div>
            </div>
            <div className={cx("container-image")}>
                <img
                    className={cx("image")}
                    src={images.doctorImage3}
                    alt="doctor"
                />
                <div className={cx("overlay")}></div>
            </div>
        </div>

      </div>
      <div className={cx("container-review")}>
        <h2>Patient Reviews</h2>
        {reviews.length === 0 ? (
          <p>There are no reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} style={{ marginBottom: "15px" }}>
                <strong>{review.username}</strong> -
                <span style={{ color: "gold" }}>
                  {" "}
                  {"★".repeat(review.rating)}
                </span>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={cx("container-image")}>
        <img className={cx("image")} src={images.doctorImage3} alt="doctor" />
        <div className={cx("overlay")}></div>
      </div>
    </div>
  );
}
export default DetailDoctor;
