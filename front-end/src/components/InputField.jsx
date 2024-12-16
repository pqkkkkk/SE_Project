import React, { useState} from "react";
import classNames from "classnames/bind";
import styles from "../pages/Login/Login.module.scss";

const cx = classNames.bind(styles);

const InputField = ({ type, placeholder, icon, parentValue, changeParentValue}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className={cx("input-wrapper")}>
            <input
                value={parentValue}
                onChange={e => changeParentValue(e.target.value)}
                type={type === "password" && showPassword ? "text" : type}
                placeholder={placeholder}
                className={cx("input-field")}
                required
            ></input>

            <i className={icon}></i>
            {type === "password" && (
                <i
                    onClick={togglePasswordVisibility}
                    className={cx(
                        "password-toggle",
                        {
                            "fa-solid fa-eye-slash": !showPassword,
                            "fa-solid fa-eye": showPassword,
                        },
                        "eye-icon"
                    )}
                ></i>
            )}
        </div>
    );
};

export default InputField;
