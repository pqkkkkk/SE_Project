import classNames from "classnames/bind";
import styles from "./UserProfile.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function UserProfile() {
    return (
        <main id={cx("user-profile")}>
            <div className={cx("content")}>
                <div className={cx("profile-sidebar")}>
                    <div className={cx("user-info")}>
                        <img
                            src={images.userAvatar}
                            className={cx("user-avatar")}
                        />
                        <h2 className={cx("user-name")}>User Name</h2>
                        <p className={cx("user-role")}>Patient</p>
                    </div>

                    <div className={cx("opportunity-container")}>
                        <div className={cx("opportunity-item", "appointments")}>
                            <p>Appointment Scheduled</p>
                            <p className={cx("quantity")}>32</p>
                        </div>

                        <div className={cx("opportunity-item", "completed")}>
                            <p>Appointment Schedule Completed</p>
                            <p className={cx("quantity")}>26</p>
                        </div>

                        <div className={cx("opportunity-item", "upcoming")}>
                            <p>Upcoming Appointment Schedule</p>
                            <p className={cx("quantity")}>6</p>
                        </div>
                    </div>
                </div>

                <div className={cx("profile-form")}>
                    <div className={cx("form-header")}>
                        <h3 className={cx("option", "active")}>
                            Account Settings
                        </h3>
                        <h3 className={cx("option")}>Notifications</h3>
                    </div>

                    <form>
                        <div className={cx("form-name")}>
                            <div className={cx("form-group")}>
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" />
                            </div>

                            <div className={cx("form-group")}>
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" />
                            </div>
                        </div>

                        <div className={cx("form-contact")}>
                            <div className={cx("form-group")}>
                                <label for="phone">Phone Number</label>
                                <input type="text" id="phone" />
                            </div>

                            <div className={cx("form-group")}>
                                <label for="email">Email Address</label>
                                <input type="email" id="email" />
                            </div>
                        </div>

                        <div className={cx("form-address")}>
                            <div className={cx("form-group")}>
                                <label for="city">City</label>
                                <select id={cx("city")}>
                                    <option selected>Ha Noi</option>
                                    <option>Ho Chi Minh</option>
                                    <option>Da Nang</option>
                                </select>
                            </div>

                            <div className={cx("form-group")}>
                                <label for="country">Country</label>
                                <select id={cx("country")}>
                                    <option selected>VietNam</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                </select>
                            </div>
                        </div>

                        <div className={cx("form-button")}>
                            <button className={cx("update-btn")} type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default UserProfile;
