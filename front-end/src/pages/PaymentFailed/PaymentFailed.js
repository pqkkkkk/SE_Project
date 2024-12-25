import classNames from "classnames/bind";
import styles from "./PaymentFailed.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function PaymentFailed() {
    return (
        <div id={cx("payment_failed")}>
            <div className={cx("payment_failed_container")}>
                <h1 className={cx("title")}>Payment Failed</h1>

                <div className={cx("icon")}>
                    <i class={cx("fa-solid", "fa-xmark")}></i>
                </div>

                <p className={cx("message")}>
                    Your payment has been failed. Please try again.
                </p>

                <p className={cx("host")}>@Medicare</p>
            </div>
        </div>
    );
}

export default PaymentFailed;
