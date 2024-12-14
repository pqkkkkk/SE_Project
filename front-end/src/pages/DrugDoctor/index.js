import classNames from "classnames/bind";
import styles from "./DrugDoctor.module.scss";
import images from "../../assets/images";
import { useState } from "react";

const cx = classNames.bind(styles);


function DrugDoctor() {

    const [prescription, setPrescription] = useState([]);


    const drugs = [
        { id: 1, name: "Panadol 1", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 2, name: "Panadol 2", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 3, name: "Panadol 3", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 4, name: "Panadol 4", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 5, name: "Panadol 5", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 6, name: "Panadol 6", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 7, name: "Panadol 7", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 8, name: "Panadol 8", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 9, name: "Panadol 9", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
        { id: 10, name: "Panadol 10", image: images.medicine, Unit: "vỉ", Price: 100000, QuantityInStock: 10 },
    ]


    const handleAddDrug = (drug) => {
        setPrescription((prev) => {
            const existingDrug = prev.find((item) => item.id === drug.id);
            if(existingDrug){
                return prev.map((item) =>
                    item.id === drug.id ? {...item, quantity: item.quantity + 1, totalPrice: item.Price * (item.quantity+1)} : item
                );
            }
            return [...prev, {...drug, quantity: 1, totalPrice: drug.Price,}];
        });
    }

    const handleRemoveDrug = (drug) => {
        setPrescription((prev) => prev.filter((item) => item.id !== drug.id));
    }

    const renderPrescription = () =>{
        if(prescription.length === 0){
            return <p></p>
        }
        return prescription.map((drug)=> (
            <div key={drug.id} className={cx("drug-item")}>
                <img src={images.medicine} className={cx("drug-img")} alt={drug.name} />
                <p className={cx("drug-name")}>{drug.name}</p>
                <p className={cx("drug-price")}>{drug.totalPrice}</p>
                <p className={cx("drug-quantity")}>{drug.quantity}</p>
                <button 
                    className={cx("btn-remove")}
                    onClick={() => handleRemoveDrug(drug)}
                >
                    Remove
                </button>
            </div>
        ));
    }

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h1>Ke Don Thuoc</h1>
            </div>

            <div className={cx("main-content")}>
                <div className={cx("list-drugs")}>
                    <input
                        className={cx("search-input")}
                        type="text"
                        placeholder="Search"
                        //value={searchValue} // Liên kết giá trị với state
                        //onChange={handleSearchChange} // Xử lý khi người dùng nhập
                    />
                    {drugs.map((drug) => (
                        <div key={drug.id} className={cx("drug-item")}>
                            <img src={images.medicine} alt={drug.name} className={cx("drug-img")} />
                            <div className={cx("drug-info")}>
                                <h3 className={cx("drug-name")}>{drug.name}</h3>
                                <p className={cx("drug-price")}>Price: {drug.Price}đ</p>
                                <p className={cx("drug-stock")}>Stock: {drug.QuantityInStock}</p>
                            </div>
                            <button 
                                className={cx("add-btn")}
                                onClick={() => handleAddDrug(drug)}
                            >
                                Add
                            </button>
                            
                        </div>
                    ))}
                </div>
                <div className={cx("prescription-detail")}>
                    <h3 className={cx("header")}>Chi tiet don thuoc</h3>

                    <div className={cx("title-column")}>
                        <p className={cx("h-img")}></p>
                        <p className={cx("h-name")}>Tên thuốc</p>
                        <p className={cx("h-price")}>Giá</p>
                        <p className={cx("h-quantity")}>Số lượng</p>
                        <p className={cx("h-remove")}></p>
                    </div>

                    <div className={cx("prescription")}>
                        {renderPrescription()}
                    </div>

                    <div className={cx("doctor-note")}>
                        <h4>Ghi chú của bác sĩ</h4>
                        <textarea
                            className={cx("note-textarea")}
                            placeholder="Nhập ghi chú cho bệnh nhân..."
                        ></textarea>
                    </div>
                    <button className={cx("submit-btn")}>Send</button>
                </div>
            </div>
            
        </div>
    )
}

export default DrugDoctor;