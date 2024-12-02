import classNames from "classnames/bind";
import images from "../assets/images";
import loginStyles from "../pages/Login/Login.module.scss";
import registerStyles from "../pages/Register/Register.module.scss";
import { useNavigate } from "react-router-dom";

const loginCx = classNames.bind(loginStyles);
const registerCx = classNames.bind(registerStyles);

const SocialLogin = ({ social_type }) => {
    const cx = social_type === "social-login" ? loginCx : registerCx;

    return (
        <div className={cx(social_type)}>
            <button className={cx("social-button")}>
                <img
                    src={images.google}
                    alt="Google"
                    className={cx("social-icon")}
                />
            </button>

            <button className={cx("social-button")}>
                <img
                    src={images.facebook}
                    alt="Facebook"
                    className={cx("social-icon")}
                />
            </button>
        </div>
    );
};

export default SocialLogin;
