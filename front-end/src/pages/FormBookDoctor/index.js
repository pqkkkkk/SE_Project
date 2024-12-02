import classNames from "classnames/bind";
import styles from "./FormBookDoctor.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function FormBookDoctor() {
  return (
    <div className={cx("content")}>
      <div className={cx("doctor")}>
        <div className={cx("doctor-info")}>
          <div className={cx("image-doctor")}>
            <img src={images.doctorImage} alt="doctor" />
            <div className={cx("rate")}>
              <img src={images.star} alt="star" />
              <span>5.0</span>
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
            Price: $300
          </label>
        </div>
        <div className={cx("input-fullname")}>
          <label className={cx("field-text")}>Full Name</label>
          <div className={cx("decor-input")}>
            <input
              className={cx("input")}
              type="text"
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
          <div className={cx("district-options")}>
            <label htmlFor="district" className={cx("field-text")}>
              District
            </label>
            <select
              id="district"
              className={cx("select-options")}
              name="district"
            >
              <option value="">All</option>
              <option value="thuduc">Thu Duc</option>
              <option value="govap">Go Vap</option>
              <option value="binhthanh">Binh Thanh</option>
            </select>
          </div>
        </div>
        <div className={cx("input-address")}>
          <label className={cx("field-text")}>Address</label>
          <div className={cx("decor-input")}>
            <input
              className={cx("input")}
              type="text"
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
        <button>Confirm Appointment</button>
      </div>
    </div>
  );
}
export default FormBookDoctor;
