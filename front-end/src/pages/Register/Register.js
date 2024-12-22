import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../../components/InputField";
import SocialLogin from "../../components/Social";

const cx = classNames.bind(styles);

function Register() {
    const [role, setRole] = useState("patient");
    return (
        <main id={cx("register")}>
            <div className={cx("content")}>
                <img src={images.onlineDoctor} className={cx("main-img")} />

                <div className={cx("register-container")}>
                    <h1 className={cx("form-title")}>Create an account</h1>

                    <div className={cx("register-role")}>
                        <div
                            className={cx("patient-role", "role", {
                                active: role === "patient",
                            })}
                            onClick={() => setRole("patient")}
                        >
                            <i
                                className={cx("fa-solid", "fa-hospital-user")}
                            ></i>

                            <p>Patient</p>
                        </div>

                        <div
                            className={cx("doctor-role", "role", {
                                active: role === "doctor",
                            })}
                            onClick={() => setRole("doctor")}
                        >
                            <i className={cx("fa-solid", "fa-user-doctor")}></i>

                            <p>Doctor</p>
                        </div>
                    </div>

                    <div
                        className={cx("register-patient")}
                        style={{
                            display: role === "patient" ? "block" : "none",
                        }}
                    >
                        <form action="#!" className={cx("register-form")}>
                            <InputField
                                type="text"
                                placeholder="Enter username"
                                icon="fa-solid fa-user"
                            />

                            <InputField
                                type="email"
                                placeholder="Enter email"
                                icon="fa-solid fa-envelope"
                            />

                            <div className={cx("fullname")}>
                                <InputField
                                    type="text"
                                    placeholder="First name"
                                    icon="fa-solid fa-user-pen"
                                />

                                <InputField
                                    type="text"
                                    placeholder="Last name"
                                    icon="fa-solid fa-user-pen"
                                />
                            </div>

                            <InputField
                                type="text"
                                placeholder="Phone number"
                                icon="fa-solid fa-phone"
                            />

                            <InputField
                                type="text"
                                placeholder="Enter address"
                                icon="fa-solid fa-address-book"
                            />

                            <InputField
                                type="date"
                                placeholder="Enter "
                                icon="fa-solid fa-calendar-days"
                            />

                            <InputField
                                type="password"
                                placeholder="Create password"
                                icon="fa-solid fa-lock"
                            />

                            <button className={cx("register-button")}>
                                Sign Up
                            </button>
                        </form>
                    </div>

                    <div
                        className={cx("register-doctor")}
                        style={{
                            display: role === "doctor" ? "block" : "none",
                        }}
                    >
                        <form action="#!" className={cx("register-form")}>
                            <InputField
                                type="text"
                                placeholder="Enter username"
                                icon="fa-solid fa-user"
                            />

                            <InputField
                                type="email"
                                placeholder="Enter email"
                                icon="fa-solid fa-envelope"
                            />

                            <div className={cx("fullname")}>
                                <InputField
                                    type="text"
                                    placeholder="First name"
                                    icon="fa-solid fa-user-pen"
                                />

                                <InputField
                                    type="text"
                                    placeholder="Last name"
                                    icon="fa-solid fa-user-pen"
                                />
                            </div>

                            <InputField
                                type="text"
                                placeholder="Phone number"
                                icon="fa-solid fa-phone"
                            />

                            <InputField
                                type="text"
                                placeholder="Enter address"
                                icon="fa-solid fa-address-book"
                            />

                            <InputField
                                type="date"
                                placeholder="Enter "
                                icon="fa-solid fa-calendar-days"
                            />

                            <InputField
                                type="text"
                                placeholder="Enter specialty"
                                icon="fa-solid fa-id-card"
                            />

                            <InputField
                                type="password"
                                placeholder="Create password"
                                icon="fa-solid fa-lock"
                            />

                            <button className={cx("register-button")}>
                                Sign Up
                            </button>
                        </form>
                    </div>

                    <p className={cx("separator")}>
                        <span>Or continue with</span>
                    </p>

                    <SocialLogin social_type="social-register" />

                    <p className={cx("signup-text")}>
                        Already have an account?
                        <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Register;
