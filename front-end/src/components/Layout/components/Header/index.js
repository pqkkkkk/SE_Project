import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../../assets/images";
import {GetUser, RemoveUserSession} from "../../../../services/UserStorageService";
import {useNavigate} from "react-router-dom";
const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const user = GetUser();
    const LogOut = () => {
        RemoveUserSession();
        navigate("/");
    }
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
                        <Link to="/review">Reviews</Link>
                    </li>
                </ul>

                <div className={cx("action")}>
                    {user === null &&
                        (<a href="/login" className={cx("action-link")}>
                        Sign in
                    </a>)}

                    {user === null &&
                        (<a href="/register" className={cx("action-btn")}>
                        Sign up
                    </a>)}
                    {user !== null &&
                        (<a href="/user-profile" className={cx("action-btn")}>
                            Profile
                        </a>)}
                    {user !== null &&
                        (<button onClick={LogOut} className={cx("action-btn")}>
                            Log out
                        </button>)}
                </div>
            </div>
        </header>
    );
}

export default Header;
