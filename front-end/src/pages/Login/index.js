import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import SocialLogin from "../../components/Social";

const cx = classNames.bind(styles);

function Login() {
    return (
        <main id={cx("login")}>
            <div className={cx("content")}>
                <img src={images.telemedicine} />

                <div className={cx("login-container")}>
                    <h1 className={cx("form-title")}>Welcome Back</h1>

                    <form action="#!" className={cx("login-form")}>
                        <InputField
                            type="email"
                            placeholder="Enter email"
                            icon="fa-solid fa-envelope"
                        />

                        <InputField
                            type="password"
                            placeholder="Enter password"
                            icon="fa-solid fa-lock"
                        />

                        <a href="#!" className={cx("forgot-pass-link")}>
                            Forgot Password?
                        </a>

                        <button className={cx("login-button")}>Sign In</button>
                    </form>

                    <p className={cx("separator")}>
                        <span>Or continue with</span>
                    </p>

                    <SocialLogin social_type="social-login" />

                    <p className={cx("signup-text")}>
                        Don't have an account?
                        <a href="/register">Sign up</a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;
