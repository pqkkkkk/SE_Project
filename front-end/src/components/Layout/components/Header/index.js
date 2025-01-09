import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../../assets/images";
import {
    GetUser,
    RemoveUserSession,
} from "../../../../services/UserStorageService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const user = GetUser();
    const location = useLocation();
    const LogOut = () => {
        RemoveUserSession();
        navigate("/");
    };
    const isActive = (path) => location.pathname === path;
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <img src={images.logo} alt="logo" />
                    <img src={images.medicare} alt="Medicare" />
                </div>

                <ul className={cx("list-services")}>
                    <li className={cx({ active: isActive("/") })}>
                        <Link to="/">Home</Link>
                    </li>
                    {user !== null && (
                        <li className={cx({ active: isActive("/schedule") })}>
                            <Link to="/schedule">Appointments</Link>
                        </li>
                    )}
                    {user !== null && user.userRole === "patient" && (
                        <li className={cx({ active: isActive("/messages") })}>
                            <Link to="/messages">Messages</Link>
                        </li>
                    )}
                    {user !== null && user.userRole === "patient" && (
                        <li className={cx({ active: isActive("/drug-list") })}>
                            <Link to="/drug-list">My Prescriptions</Link>
                        </li>
                    )}
                    {user !== null && user.userRole === "patient" && (
                        <li
                            className={cx({ active: isActive("/find-doctor") })}>
                            <Link to="/find-doctor">Find Doctor</Link>
                        </li>
                    )}
                    {user !== null && user.userRole === "doctor" && (
                        <li className={cx({ active: isActive("/requests") })}>
                            <Link to="/requests">Requests</Link>
                        </li>
                    )}
                    {user !== null && user.userRole === "doctor" && (
                        <li
                            className={cx({
                                active: isActive("/manage-patient"),
                            })}>
                            <Link to="/manage-patient">My Patients</Link>
                        </li>
                    )}
                    {user !== null && user.userRole === "doctor" && (
                        <li className={cx({ active: isActive("/messages") })}>
                            <Link to="/messages">Chat</Link>
                        </li>
                    )}
                    {user !== null && user.userRole === "doctor" && (
                        <li className={cx({ active: isActive("/work-calendar") })}>
                            <Link to="/work-calendar">Calendar</Link>
                        </li>
                    )}
                </ul>

                <div className={cx("action")}>
                    {user === null && (
                        <a href="/login" className={cx("action-link")}>
                            Sign in
                        </a>
                    )}

                    {user === null && (
                        <a href="/register" className={cx("action-btn")}>
                            Sign up
                        </a>
                    )}
                    {user !== null && (
                        <a href="/user-profile" className={cx("action-btn")}>
                            Profile
                        </a>
                    )}
                    {user !== null && (
                        <button onClick={LogOut} className={cx("action-btn")}>
                            Log out
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
