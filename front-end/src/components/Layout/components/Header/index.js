import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../../assets/images";

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <img src={images.logo} alt="logo" />
                    <img src={images.medicare} alt="Medicare" />
                </div>

                <ul className={cx("list-services")}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/our-service">Our Service</Link>
                    </li>
                    <li>
                        <Link to="/find-doctor">Find Doctor</Link>
                    </li>
                    <li>
                        <Link to="/requests">Requests</Link>
                    </li>
                </ul>

                <div className={cx("action")}>
                    <a href="/login" className={cx("action-link")}>
                        Sign in
                    </a>

                    <a href="/register" className={cx("action-btn")}>
                        Sign up
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
