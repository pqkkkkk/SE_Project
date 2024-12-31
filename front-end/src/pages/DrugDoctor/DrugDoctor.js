import classNames from "classnames/bind";
import styles from "./DrugDoctor.module.scss";
import images from "../../assets/images";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {GetAllDrugs, SavePrescription, GetPrescriptionByConsultationId, GetPrescriptionDetail} from "../../services/ApiService";
const cx = classNames.bind(styles);


function DrugDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const patient = location.state.patient;
    const consultation = location.state.consultation;
    const [prescription, setPrescription] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [drugs, setDrugs] = useState([]);
    const [prescribed, setPrescribed] = useState(false);
    useEffect(() => {
        GetPrescriptionByConsultationId(consultation.consultationId)
            .then((data) => {
                if(data)
                {
                    GetPrescriptionDetail(data.prescriptionId)
                        .then((data) => {
                            if(data.details.length > 0)
                            {
                                setPrescribed(true);
                            }
                            setPrescription(data.details || []);
                        })
                        .catch((error) => {
                            console.log(error);
                            setPrescription([]);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                setPrescription([]);
            });
        GetAllDrugs().then((data) =>
        {
            setDrugs(data || []);
        })
            .catch((error) =>{
                console.log(error);
                setDrugs([]);
            });
    }, []);
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }
    const filteredDrugs = drugs.filter((drug) => 
        drug.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const handleAddDrug = (drug) => {
        setPrescription((prev) => {
            const existingDrug = prev.find((item) => item.drugId === drug.drugId);
            if(existingDrug){
                return prev.map((item) =>
                    item.drugId === drug.drugId ? {...item, quantity: item.quantity + 1, totalPrice: item.price * (item.quantity+1)} : item
                );
            }
            return [...prev, {...drug, quantity: 1, totalPrice: drug.price,usage: ""}];
        });
    }
    const handleRemoveDrug = (drug) => {
        setPrescription((prev) => prev.filter((item) => item.drugId !== drug.drugId));
    }
    const HandleSavePrescription = () => {
        const consultationId = consultation.consultationId;
        SavePrescription(prescription,consultationId)
            .then((data) =>{
                console.log(data);
                if(data === "Created"){
                    alert("Prescription saved successfully");
                    navigate("/manage-patient");
                }
                else if (data === "Error in server"){
                    alert("Error in server");
                }
                else if (data === "Failed"){
                    alert("Failed to save prescription");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const renderPrescription = () =>{
        if(prescription.length === 0){
            return <p></p>
        }
        return prescription.map((drug)=> (
            <div key={drug.drugId} className={cx("drug-item")}>
                <img src={images.medicine} className={cx("drug-img")} alt={drug.name} />
                <p className={cx("drug-name")}>{drug.name}</p>
                <p className={cx("drug-price")}>{drug.totalPrice}</p>
                <p className={cx("drug-quantity")}>{drug.quantity}</p>
                <button
                    disabled={prescribed}
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
                <h1>Prescribe for {patient.fullName}</h1>
            </div>
            {prescribed && <p className={cx("prescribed")}>Prescription has been saved. Cannot edit</p>}
            <div className={cx("main-content")}>
                <div className={cx("list-drugs")}>
                    <input
                        className={cx("search-input")}
                        type="text"
                        placeholder="Search"
                        value={searchValue} 
                        onChange={handleSearchChange} 
                    />
                    {filteredDrugs.map((drug) => (
                        <div key={drug.drugId} className={cx("drug-item")}>
                            <img src={images.medicine} alt={drug.name} className={cx("drug-img")} />
                            <div className={cx("drug-info")}>
                                <h3 className={cx("drug-name")}>{drug.name}</h3>
                                <p className={cx("drug-price")}>Price: {drug.price}đ</p>
                                <p className={cx("drug-stock")}>Stock: {drug.quantity}</p>
                            </div>
                            <button
                                disabled={prescribed}
                                className={cx("add-btn")}
                                onClick={() => handleAddDrug(drug)}
                            >
                                Add
                            </button>
                            
                        </div>
                    ))}
                </div>
                <div className={cx("prescription-detail")}>
                    <h3 className={cx("header")}>Prescription Of Consultation {consultation.consultationId}</h3>

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
                    <button disabled={prescribed} className={cx("submit-btn")} onClick={HandleSavePrescription}>Save</button>
                </div>
            </div>
            
        </div>
    )
}

export default DrugDoctor;