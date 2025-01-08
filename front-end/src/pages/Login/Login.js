import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import SocialLogin from "../../components/Social";
import {login} from "../../services/ApiService";
import {useState} from "react";
import {setUserSession} from "../../services/UserStorageService";
import {SubcribeCorrespondingTopic} from "../../services/SocketService";
import {GetConnectingUsers} from "../../services/ApiService";
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [response, setResponse] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const signInClick = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            if (data.id) {
                alert("Login successful");
                setUserSession(data);
                SubcribeCorrespondingTopic(data.id);
                if(data.userRole !== "admin")
                    navigate("/");
                else
                    navigate("/admin");
            } else  {
                alert("Wrong username or password");
            }
        } catch (error) {
            console.log(error);
            alert("Error in server");
        }
    };

    return (
        <main id={cx("login")}>
            <div className={cx("content")}>
                <img src={images.telemedicine} />

                <div className={cx("login-container")}>
                    <h1 className={cx("form-title")}>Welcome Back</h1>

                    <form action="#!" className={cx("login-form")}>
                        <InputField
                            type="username"
                            placeholder="Enter username"
                            icon="fa-solid fa-envelope"
                            parentValue={username}
                            changeParentValue={setUsername}
                        />

                        <InputField
                            type="password"
                            placeholder="Enter password"
                            icon="fa-solid fa-lock"
                            parentValue={password}
                            changeParentValue={setPassword}
                        />

                        <a href="#!" className={cx("forgot-pass-link")}>
                            Forgot Password?
                        </a>

                        <button className={cx("login-button")} onClick={signInClick}>Sign In</button>
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
