import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import SocialLogin from "../../components/Social";

const cx = classNames.bind(styles);

function Register() {
  return (
    <main id={cx("register")}>
      <div className={cx("content")}>
        <img src={images.onlineDoctor} />

        <div className={cx("register-container")}>
          <h1 className={cx("form-title")}>Welcome User</h1>

          <form action="#!" className={cx("register-form")}>
            <InputField
              type="email"
              placeholder="Enter email"
              icon="fa-solid fa-envelope"
            />

            <InputField
              type="password"
              placeholder="Create Password"
              icon="fa-solid fa-lock"
            />

            <InputField
              type="password"
              placeholder="Confirm Password"
              icon="fa-solid fa-lock"
            />

            <button className={cx("register-button")}>Sign Up</button>
          </form>

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
