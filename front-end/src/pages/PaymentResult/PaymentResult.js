import classNames from "classnames/bind";
import styles from "./PaymentResult.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {UpdatePrescriptionStatus} from "../../services/ApiService";

const cx = classNames.bind(styles);

function PaymentResult() {
    const navigate = useNavigate();
    const [showPaymentFail, setShowPaymentFail] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    useEffect(() => {
        const queryParamsValue = new URLSearchParams(window.location.search);
        if(queryParamsValue.get("vnp_TxnRef")) {
            console.log(queryParamsValue.get("vnp_TxnRef"));
            const prescriptionId = queryParamsValue.get("vnp_TxnRef");
            UpdatePrescriptionStatus(prescriptionId, "paid")
                .then((data) => {
                    console.log(data);
                    if (queryParamsValue.get('vnp_ResponseCode')) {
                        if (queryParamsValue.get('vnp_ResponseCode') === '00') {
                            setShowPaymentSuccess(true);
                        } else {
                            setShowPaymentFail(true);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    const handleGoBack = () => {
        navigate('/drug-list');
    }
    return (
        <div>
            { showPaymentSuccess && (<div id={cx("successful_payment")}>
                <div className={cx("successful_payment_container")}>
                    <h1 className={cx("title")}>Payment successful</h1>

                    <div className={cx("icon")}>
                        <i className={cx("fa-solid", "fa-check")}></i>
                    </div>

                    <p className={cx("message")}>
                        Thank you for your payment. Your payment has been
                        successfully processed.
                    </p>

                    <p className={cx("host")}>@Medicare</p>
                    <button className={cx("go-back-btn")} onClick={handleGoBack}> Go back</button>
                </div>
            </div>)}
            { showPaymentFail && (<div id={cx("payment_failed")}>
                <div className={cx("payment_failed_container")}>
                    <h1 className={cx("title")}>Payment Failed</h1>

                    <div className={cx("icon")}>
                        <i class={cx("fa-solid", "fa-xmark")}></i>
                    </div>

                    <p className={cx("message")}>
                        Your payment has been failed. Please try again.
                    </p>

                    <p className={cx("host")}>@Medicare</p>
                    <button className={cx("go-back-btn")} onClick={handleGoBack}> Go back</button>
                </div>
            </div>)}
        </div>
    );
}

export default PaymentResult;
