import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./DrugList.module.scss";
import {useEffect, useState} from "react";
import {
    GetPrescriptionByPatientId,
    GetDrugById,
    GetPrescriptionDetail,
    CreatePaymentUrl,
    UpdatePrescriptionStatus
} from "../../services/ApiService";
const cx = classNames.bind(styles);


function DrugList() {
    const [prescriptionList, setPrescriptionList] = useState([]);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [detailOfSelectedPrescription, setDetailOfSelectedPrescription] = useState([]);
    const [showPrescriptionDetail, setShowPrescriptionDetail] = useState(false);
    const [showPaymentFail, setShowPaymentFail] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [showPaidPrescription, setShowPaidPrescription] = useState(false);
    const [showUnpaidPrescription, setShowUnpaidPrescription] = useState(true);
    useEffect(() =>  {
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
        GetPrescriptionByPatientId(1, "Done","unpaid")
            .then((data) => {
            setPrescriptionList(data || []);
        })
            .catch((error) => {
            });
    }, []);
    const handleDetailClick = async (prescription) => {
        setSelectedPrescription(prescription);
        setShowPrescriptionDetail(true);
        const detail = await GetPrescriptionDetail(prescription.prescriptionId);
        console.log(detail);
        const detailsWithDrugs = await Promise.all(
            detail.details.map(async (item) => {
                const drugInfo = await GetDrugById(item.drugId);
                console.log(drugInfo);
                return { ...item, drug: drugInfo };
            })
        );
        setDetailOfSelectedPrescription(detailsWithDrugs);

    };

    const handleCloseMedicineList = () => {
        setShowPrescriptionDetail(false);
        setSelectedPrescription(null);
    };
    const HandlePayClick = async () => {
        const paymentUrl = await CreatePaymentUrl({
            amount: selectedPrescription.totalPrice,
            orderDescription: "Thanh toan don thuoc",
            orderId: selectedPrescription.prescriptionId,
            orderType: 'other',
            language: 'vn',
            bankCode: 'NCB',
        });
        window.location.href = paymentUrl;
    };
    const OffPaymentSuccessNoti = () => {
        setShowPaymentSuccess(false);
    }
    const OffPaymentFailNoti = () => {
        setShowPaymentFail(false);
    }

    const unpaidPrescription = [
        { id: 1, prescriptionId: 1, createdDay: "2022-09-01" },
        { id: 2, prescriptionId: 2, createdDay: "2022-09-02" },
        { id: 3, prescriptionId: 3, createdDay: "2022-09-03" },
        { id: 4, prescriptionId: 4, createdDay: "2022-09-04" },
        { id: 5, prescriptionId: 5, createdDay: "2022-09-05" },
        { id: 6, prescriptionId: 6, createdDay: "2022-09-06" },
        { id: 7, prescriptionId: 7, createdDay: "2022-09-07" },
        { id: 8, prescriptionId: 8, createdDay: "2022-09-08" },
        { id: 9, prescriptionId: 9, createdDay: "2022-09-09" },
        { id: 10, prescriptionId: 10, createdDay: "2022-09-10" },
    ]

    const paidPrescription = [
        { id: 1, prescriptionId: 1, createdDay: "2021-09-01" },
        { id: 2, prescriptionId: 2, createdDay: "2021-09-02" },
        { id: 3, prescriptionId: 3, createdDay: "2021-09-03" },
        { id: 4, prescriptionId: 4, createdDay: "2021-09-04" },
        { id: 5, prescriptionId: 5, createdDay: "2021-09-05" },
        { id: 6, prescriptionId: 6, createdDay: "2021-09-06" },
        { id: 7, prescriptionId: 7, createdDay: "2021-09-07" },
        { id: 8, prescriptionId: 8, createdDay: "2021-09-08" },
        { id: 9, prescriptionId: 9, createdDay: "2021-09-09" },
        { id: 10, prescriptionId: 10, createdDay: "2021-09-10" },
    ]

    const handleUnpaidPrescriptionClick = () => {
        setShowUnpaidPrescription(true);
        setShowPaidPrescription(false);
        setPrescriptionList(unpaidPrescription);
    }

    const handlePaidPrescriptiononClick = () => {
        setShowUnpaidPrescription(false);
        setShowPaidPrescription(true);
        setPrescriptionList(paidPrescription);
    }

    return(
        <div className={cx('container')}>
            <div className={cx('background')}>
                <div className={cx('title')}>
                    <h2 className={cx('strong-title')}>WELLNESS</h2>
                    <h3 className={cx('soft-title')}>DELIVERED DAILY</h3>
                    <p className={cx('desc')}>Trang bán thuốc trực tuyến của bệnh viện chúng tôi mang đến sự tiện
                        lợi và chăm sóc sức khỏe toàn diện ngay tại nhà.</p>
                </div>
                <img src={images.medicineBg} alt="medicineBg" className={cx('medicine-bg')}/>
            </div>

            
            <div className={cx('filter')}>
                <div className={cx("btn-group")}>
                    <button className={cx('btn-filter', showUnpaidPrescription && 'active')} 
                            onClick={() => handleUnpaidPrescriptionClick()}>
                        UNPAID
                    </button>
                    <button className={cx('btn-filter', showPaidPrescription && 'active')} 
                            onClick={() => handlePaidPrescriptiononClick()}>
                        PAID
                    </button>
                </div>
                {showUnpaidPrescription && (
                    <div className={cx('list-drugs')}>
                        {prescriptionList.map((pre) => (
                            <div key={pre.id} className={cx('prescription')}>
                                <img src={images.default_pre} alt="medicine" className={cx('medicine-img')}/>
                                <div className={cx('pre-info')}>
                                    <p className={cx('pre-id')}>ID: #{pre.prescriptionId}</p>
                                    <p className={cx('pre-date')}>Created date: {pre.createdDay}</p>
                                </div>
                                <button className={cx('btn-detail')} onClick={() => handleDetailClick(pre)}>
                                    Detail
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {showPaidPrescription && (
                    <div className={cx('list-drugs')}>
                        {prescriptionList.map((pre) => (
                            <div key={pre.id} className={cx('prescription')}>
                                <div className={cx('img-wrapper')} >
                                    <img src={images.default_pre} alt="medicine" className={cx('medicine-img')}/>
                                    <img src={images.paid} alt="" className={cx('paid-overlay')}/>
                                </div>
                                <div className={cx('pre-info')}>
                                    <p className={cx('pre-id')}>ID: #{pre.prescriptionId}</p>
                                    <p className={cx('pre-date')}>Created date: {pre.createdDay}</p>
                                </div>
                                <button className={cx('btn-detail')} onClick={() => handleDetailClick(pre)}>
                                    Detail
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>  
            
            

            <div className={cx('feature')}>
                <img src={images.feature1} alt="feature1" className={cx('feature-img')}/>
                <img src={images.feature2} alt="feature2" className={cx('feature-img')}/>
                <img src={images.feature3} alt="feature3" className={cx('feature-img')}/>
                <img src={images.feature4} alt="feature4" className={cx('feature-img')}/>
            </div>

            {showPrescriptionDetail && (
                <div className={cx("medicine-list-overlay")}>
                    <div className={cx("medicine-list-popup")}>
                        <h2 className={cx("popup-title")}>Chi tiết đơn thuốc</h2>
                        <button className={cx("btn-close")} onClick={handleCloseMedicineList}>
                            Đóng
                        </button>
                        <div className={cx("medicine-list")}>
                            {detailOfSelectedPrescription.map((item) => {
                                return (
                                    <div key={item.drug.id} className={cx("medicine")}>
                                        <img src={images.medicine} alt={item.drug.name} className={cx("medicine-img")}/>
                                        <div>
                                            <p className={cx("medicine-name")}>{item.drug.name}</p>
                                            <p className={cx("medicine-desc")}>
                                                Quantity: {item.drug.quantity} {item.drug.unit}
                                            </p>
                                            <p className={cx("medicine-price")}>Price: {item.totalPrice.toLocaleString()}đ</p>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <p className={cx("note")}>
                            <span className={cx("red")}>Total Price: </span>
                            {selectedPrescription.totalPrice.toLocaleString()}
                        </p>
                        <button className={cx("btn-buy")} onClick={HandlePayClick}>Pay</button>
                    </div>
                </div>
            )}
            { showPaymentSuccess && (<div className="paymentSuccess">
                    <div className={cx("success-icon")}>✔</div>
                    <div className={cx("title")}>Transaction Successful!</div>
                    <div className={cx("message")}>Thank you for your purchase. Your transaction has been completed
                        successfully.
                    </div>
                    <button id="closeButton" className={cx("button")} onClick={OffPaymentSuccessNoti}>Close</button>
                </div>)
            }
            { showPaymentFail && (<div className="paymentFail">
                <div className={cx("error-icon")}>✖</div>
                <div className={cx("title")}>Transaction Failed!</div>
                <div className={cx("message")}> We’re sorry, but your transaction could not be completed. Please try again later or contact support.
                </div>
                <button id="closeButton" className={cx("button")} onClick={OffPaymentFailNoti}>Close</button>
            </div>)
            }
        </div>
    );
}

export default DrugList;