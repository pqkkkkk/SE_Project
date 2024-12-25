import classNames from "classnames/bind";
import styles from "./SuccessfulPayment.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function SuccessfulPayment() {
    return (
        <div id={cx("successful_payment")}>
            <div className={cx("successful_payment_container")}>
                <h1 className={cx("title")}>Payment successful</h1>

                <div className={cx("icon")}>
                    <i class={cx("fa-solid", "fa-check")}></i>
                </div>

                <p className={cx("message")}>
                    Thank you for your payment. Your payment has been
                    successfully processed.
                </p>

                <p className={cx("host")}>@Medicare</p>
            </div>
        </div>
    );
}

export default SuccessfulPayment;
