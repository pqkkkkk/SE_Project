import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./ManageDrug.module.scss";
import React, { useState, useEffect, useRef } from "react";
import {GetAllDrugs, CreateDrug, UpdateDrug} from "../../services/ApiService";
const cx = classNames.bind(styles);
const mockDrugData = [
  {
    id: 1,
    name: "Panadol 1",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 2,
    name: "Panadol 2",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 3,
    name: "Panadol 3",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 4,
    name: "Panadol 4",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 5,
    name: "Panadol 5",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 6,
    name: "Panadol 6",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 7,
    name: "Panadol 7",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 8,
    name: "Panadol 8",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 9,
    name: "Panadol 9",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
  {
    id: 10,
    name: "Panadol 10",
    Unit: "vỉ",
    Price: 100000,
    QuantityInStock: 10,
    Manufacturing_Date: "2023-10-10",
    Expiry_Date: "2025-10-10",
  },
];
function ManageDrug() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [updatedSelectedMedicine, setUpdatedSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    price: 0,
    unit: "",
    quantity: 0,
    manufactoring_date: "",
    expiry_date: "",
    drugTypeName: "Antibiotic",
  });

  useEffect(() => {
    GetAllDrugs()
        .then((data) => {
          setMedicines(data)
        })
        .catch((error) => {
            console.error(error);
        });
  }, []);
  const formatDateToMMDDYYYY = (date) => {
    const values = date.split("-");
    return `${values[1]}-${values[2]}-${values[0]}`;
  }
  const formatDateToYYYYMMDD = (mmddyyyydate) => {
    const values = mmddyyyydate.split("-");
    return `${values[2]}-${values[0]}-${values[1]}`;
  }
  const handleAddMedicine = async () => {
    if (
        newMedicine.name.trim() &&
        String(newMedicine.price).trim() &&
        newMedicine.unit.trim() &&
        String(newMedicine.quantity).trim() &&
        newMedicine.manufactoring_date.trim() &&
        newMedicine.expiry_date.trim() &&
        newMedicine.drugTypeName.trim()
      )
      {
        console.log(newMedicine);
        const response = await CreateDrug(newMedicine);
          if (response === 1) {
            alert("Add drug successfully!");
            window.location.reload();
          }
          else {
            console.log(newMedicine)
            alert("Add drug failed!");
          }
      }
    else {
        alert("Please fill in all fields!");
    }
  };
  const openEditModal = (medicine) => {
    setSelectedMedicine(medicine);
    setUpdatedSelectedMedicine(medicine);
    setIsModalOpen(true);
  };
  const removeMedicine = (medicine) => {
    setMedicines((prevMedicines) =>
      prevMedicines.filter((med) => med.id !== medicine.id)
    );
    alert("Delete drug successfully!");
  };
  const handleUpdateMedicine = async  () => {
    if (
        updatedSelectedMedicine.name.trim() &&
        String(selectedMedicine.price).trim() &&
        updatedSelectedMedicine.unit.trim() &&
        String(updatedSelectedMedicine.quantity).trim() &&
        updatedSelectedMedicine.manufactoring_date.trim() &&
        updatedSelectedMedicine.expiry_date.trim() &&
        updatedSelectedMedicine.drugTypeName.trim()
      )
    {
      if (
          updatedSelectedMedicine.name !== selectedMedicine.name ||
          updatedSelectedMedicine.price !== selectedMedicine.price ||
          updatedSelectedMedicine.unit !== selectedMedicine.unit ||
          updatedSelectedMedicine.quantity !== selectedMedicine.quantity ||
          updatedSelectedMedicine.manufactoring_date !== selectedMedicine.manufactoring_date ||
          updatedSelectedMedicine.expiry_date !== selectedMedicine.expiry_date) {
          const response = await UpdateDrug(updatedSelectedMedicine);
          if(response === 1) {
            setMedicines((prev) =>
                prev.map((med) =>
                    med.id === updatedSelectedMedicine.id ? {...med, ...updatedSelectedMedicine} : med
                )
            );
            alert("Edit drug successfully!");
          }
          else {
            alert("Error!");
          }
      }
      else{
        alert("Nothing changed");
      }
      setIsModalOpen(false);
    }
    else {
        alert("Please fill in all fields!");
    }
  };

  return (
    <div className={cx("manage-medicines")}>
      <div className={cx("left-column")}>
        <h2 className={cx("title")}>Drug List</h2>
        <ul className={cx("medicine-list")}>
          {medicines.map((medicine) => (
            <li key={medicine.drugId} className={cx("medicine-item")}>
              <div>
                <img
                    src={images.medicine}
                    className={cx("drug-img")}
                    alt="drug-image"
                />
                <h3 className={cx("medicine-name")}>{medicine.name}</h3>
                <p className={cx("medicine-price")}>Price: {medicine.price} VNĐ</p>
                <p className={cx("medicine-quantity")}>Unit: {medicine.unit}</p>
                <p className={cx("medicine-quantity")}>
                  Quantity: {medicine.quantity}
                  <span className={cx("out-of-stock")}>
                    {medicine.quantity === "0" && " (Out of stock)"}
                  </span>
                </p>
                <p className={cx("medicine-manufacturing")}>
                  MFG: {formatDateToMMDDYYYY(medicine.manufactoring_date)}
                </p>
                <p className={cx("medicine-expiry")}>
                  EXP: {formatDateToMMDDYYYY(medicine.expiry_date)}
                </p>
                <p className={cx("medicine-type")}>Type: {medicine.drugTypeName}</p>
              </div>
              <button
                  className={cx("edit-btn")}
                  onClick={() => openEditModal(medicine)}>
                Edit
              </button>
              <button
                className={cx("remove-btn")}
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete?"
                  );
                  if (confirmDelete) {
                    removeMedicine(medicine);
                  }
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={cx("right-column")}>
        <h2 className={cx("title")}>Add new drug</h2>
        <div className={cx("form")}>
          <label>Name:</label>
          <input
            className={cx("input")}
            type="text"
            placeholder="Name Drug"
            value={newMedicine.name}
            onChange={(e) =>
              setNewMedicine((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <label>Price:</label>
          <input
            className={cx("input")}
            type="number"
            placeholder="Price"
            min="0"
            step="10000"
            value={newMedicine.price}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
            <label>Unit:</label>
          <input
            className={cx("input")}
            type="text"
            placeholder="Unit"
            value={newMedicine.unit}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                unit: e.target.value,
              }))
            }
          />
            <label>Quantity:</label>
          <input
            className={cx("input")}
            type="number"
            min="0"
            placeholder="Quantity"
            value={newMedicine.quantity}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
          />
            <label>Manufacturing Date:</label>
          <input
            className={cx("input")}
            type="date"
            placeholder="Manufacturing Date"
            value={newMedicine.manufactoring_date}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                manufactoring_date: e.target.value,
              }))
            }
          />
            <label>Expiry Date:</label>
          <input
            className={cx("input")}
            type="date"
            placeholder="Expiry Date"
            value={newMedicine.expiry_date}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                expiry_date: e.target.value,
              }))
            }
          />
          <label>Type:</label>
          <select
              value={newMedicine.drugTypeName}
              className={cx("input")}
              onChange={(e) => {
                setNewMedicine((prev) => ({
                  ...prev,
                  drugTypeName: e.target.value,
                }))
              }}>
            <option value="Antibiotic">Antibiotic</option>
            <option value="Antifungal">Antifungal</option>
            <option value="Antiviral">Antiviral</option>
            <option value="Cholesterol">Cholesterol</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Painkiller">Painkiller</option>
          </select>
          <button className={cx("add-btn")} onClick={handleAddMedicine}>
            Add
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={cx("modal")}>
          <div className={cx("modal-content")}>
            <h2>Edit Drug</h2>
            <label>Name:</label>
            <input
                className={cx("input")}
                type="text"
                value={updatedSelectedMedicine.name}
                onChange={(e) =>
                    setUpdatedSelectedMedicine((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                }
            />
            <label>Price:</label>
            <input
                className={cx("input")}
                type="text"
                value={updatedSelectedMedicine.price}
                onChange={(e) =>
                    setUpdatedSelectedMedicine((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                }
            />
            <label>Unit:</label>
            <input
                className={cx("input")}
                type="text"
                placeholder="Unit"
                value={updatedSelectedMedicine.unit}
                onChange={(e) =>
                    setUpdatedSelectedMedicine((prev) => ({
                      ...prev,
                      unit: e.target.value,
                    }))
                }
            />
            <label>Quantity:</label>
            <input
                className={cx("input")}
                type="text"
                placeholder="Quantity"
                value={updatedSelectedMedicine.quantity}
                onChange={(e) =>
                    setUpdatedSelectedMedicine((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                }
            />
            <label>Manufacturing Date:</label>
            <input
                className={cx("input")}
                type="date"
                placeholder="MFG"
                value={updatedSelectedMedicine.manufactoring_date}
                onChange={(e) =>
                    setUpdatedSelectedMedicine((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                }
            />
            <label>Expiry Date:</label>
            <input
                className={cx("input")}
                type="date"
                placeholder="EXP"
                value={updatedSelectedMedicine.expiry_date}
                onChange={(e) => {
                  setUpdatedSelectedMedicine((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
                }
            />
            <div className={cx("modal-actions")}>
              <button
                  className={cx("save-btn")} onClick={handleUpdateMedicine}>
                Save
              </button>
              <button
                  className={cx("cancel-btn")}
                  onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageDrug;
