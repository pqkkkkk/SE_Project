import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./DrugList.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function DrugList() {

    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [showMedicineList, setShowMedicineList] = useState(false);

    const drugs = [
        { id: 1, name: "Panadol 1", image: images.medicine, Quantity: 2, Unit: "vỉ", Price: 100000 },
        { id: 2, name: "Panadol 2", image: images.medicine, Quantity: 1, Unit: "Hộp", Price: 200000},
        { id: 3, name: "Panadol 3", image: images.medicine, Quantity: 3, Unit: "vỉ", Price: 300000 },
        { id: 4, name: "Panadol 4", image: images.medicine, Quantity: 1, Unit: "Hộp", Price: 400000 },
        { id: 5, name: "Panadol 5", image: images.medicine, Quantity: 2, Unit: "vỉ", Price: 500000 },
        { id: 6, name: "Panadol 6", image: images.medicine, Quantity: 1, Unit: "Hộp", Price: 600000 },
    ]

    const Prescription = [
        { id: 1, Drug_ID: [1, 2, 3, 4, 5 ,6], Created_day: "2024-09-12", Usage: "Thuoc 1 su dung 2 lan/ngay sau an" },
        { id: 2, Drug_ID: [1, 2], Created_day: "2024-09-12", Usage: "Thuoc 1 su dung 2 lan/ngay sau an" },
        { id: 3, Drug_ID: [1, 2], Created_day: "2024-09-12", Usage: "Thuoc 1 su dung 2 lan/ngay sau an" },
    ];

    const handleDetailClick = (prescription) => {
        setSelectedPrescription(prescription);
        setShowMedicineList(true);
    };

    const handleCloseMedicineList = () => {
        setShowMedicineList(false);
        setSelectedPrescription(null);
    };

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

            <div className={cx('feature')}>
                <img src={images.feature1} alt="feature1" className={cx('feature-img')}/>
                <img src={images.feature2} alt="feature2" className={cx('feature-img')}/>
                <img src={images.feature3} alt="feature3" className={cx('feature-img')}/>
                <img src={images.feature4} alt="feature4" className={cx('feature-img')}/>
            </div>

            <div className={cx('filter')}>
                <h2 className={cx('label')}>Danh sách thuốc cần mua</h2>
                <div className={cx('list-drugs')}>
                    {Prescription.map((pre) => (
                        <div key={pre.id} className={cx('prescription')}>
                            <img src={images.default_pre} alt="medicine" className={cx('medicine-img')}/>
                            <div className={cx('pre-info')}>
                                <p className={cx('pre-id')}>ID: #{pre.id}</p>
                                <p className={cx('pre-date')}>Created date: {pre.Created_day}</p>
                            </div>
                            <button className={cx('btn-detail')} onClick={() => handleDetailClick(pre)}>
                                Detail
                            </button>
                        </div>    
                    ))}
                </div>
            </div>
            


            {showMedicineList && (
                <div className={cx("medicine-list-overlay")}>
                    <div className={cx("medicine-list-popup")}>
                        <h2 className={cx("popup-title")}>Chi tiết đơn thuốc</h2>
                        <button className={cx("btn-close")} onClick={handleCloseMedicineList}>
                            Đóng
                        </button>
                        <div className={cx("medicine-list")}>
                            {selectedPrescription?.Drug_ID.map((drugId) => {
                                const drug = drugs.find((d) => d.id === drugId);
                                return (
                                    <div key={drug.id} className={cx("medicine")}>
                                        <img src={drug.image} alt={drug.name} className={cx("medicine-img")} />
                                        <div>
                                            <p className={cx("medicine-name")}>{drug.name}</p>
                                            <p className={cx("medicine-desc")}>
                                                Quantity: {drug.Quantity} {drug.Unit}
                                            </p>
                                            <p className={cx("medicine-price")}>Price: {drug.Price.toLocaleString()}đ</p>
                                            
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <p className={cx("note")}>
                            <span className={cx("red")}>Note: </span> 
                            {selectedPrescription.Usage}
                        </p>
                        <button className={cx("btn-buy")}>BUY</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DrugList;