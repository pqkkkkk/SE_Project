import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./ManageDrug.module.scss";
import React, { useState, useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function ManageDrug() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    Price: "",
    Unit: "",
    QuantityInStock: "",
    Manufacturing_Date: "",
    Expiry_Date: "",
  });

  useEffect(() => {
    setMedicines([
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
    ]);
  }, []);

  const handleAddMedicine = () => {
    if (
      newMedicine.name.trim() &&
      newMedicine.Price.trim() &&
      newMedicine.Unit.trim() &&
      newMedicine.QuantityInStock.trim() &&
      newMedicine.Manufacturing_Date.trim() &&
      newMedicine.Expiry_Date.trim()
    ) {
      setMedicines((prev) => [...prev, { id: Date.now(), ...newMedicine }]);
      setNewMedicine({
        name: "",
        Price: "",
        Unit: "",
        QuantityInStock: "",
        Manufacturing_Date: "",
        Expiry_Date: "",
      });
    }
    alert("Add new drug successfully!");
  };

  const openEditModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const removeMedicine = (medicine) => {
    setMedicines((prevMedicines) =>
      prevMedicines.filter((med) => med.id !== medicine.id)
    );
    alert("Delete drug successfully!");
  };

  const handleEditMedicine = () => {
    if (
      selectedMedicine.name.trim() &&
      String(selectedMedicine.Price).trim() &&
      selectedMedicine.Unit.trim() &&
      String(selectedMedicine.QuantityInStock).trim()
    ) {
      setMedicines((prev) =>
        prev.map((med) =>
          med.id === selectedMedicine.id ? { ...med, ...selectedMedicine } : med
        )
      );
      setIsModalOpen(false);
      alert("Edit drug successfully!");
    }
  };

  return (
    <div className={cx("manage-medicines")}>
      <div className={cx("left-column")}>
        <h2 className={cx("title")}>Drug List</h2>
        <ul className={cx("medicine-list")}>
          {medicines.map((medicine) => (
            <li key={medicine.id} className={cx("medicine-item")}>
              <div>
                <img
                  src={images.medicine}
                  className={cx("drug-img")}
                  alt="drug-image"
                />
                <h3 className={cx("medicine-name")}>{medicine.name}</h3>
                <p className={cx("medicine-price")}>{medicine.Price} VNĐ</p>
                <p className={cx("medicine-quantity")}>Unit: {medicine.Unit}</p>
                <p className={cx("medicine-quantity")}>
                  Quantity: {medicine.QuantityInStock}
                  <span className={cx("out-of-stock")}>
                    {medicine.QuantityInStock === "0" && " (Out of stock)"}
                  </span>
                </p>
                <p className={cx("medicine-manufacturing")}>
                  MFG: {medicine.Manufacturing_Date}
                </p>
                <p className={cx("medicine-expiry")}>
                  EXP: {medicine.Expiry_Date}
                </p>
              </div>
              <button
                className={cx("edit-btn")}
                onClick={() => openEditModal(medicine)}
              >
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
          <input
            className={cx("input")}
            type="text"
            placeholder="Name Drug"
            value={newMedicine.name}
            onChange={(e) =>
              setNewMedicine((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            className={cx("input")}
            type="number"
            placeholder="Price"
            min="0"
            step="10000"
            value={newMedicine.Price}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                Price: e.target.value,
              }))
            }
          />
          <input
            className={cx("input")}
            type="text"
            placeholder="Unit"
            value={newMedicine.Unit}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                Unit: e.target.value,
              }))
            }
          />
          <input
            className={cx("input")}
            type="number"
            min="0"
            placeholder="Quantity"
            value={newMedicine.QuantityInStock}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                QuantityInStock: e.target.value,
              }))
            }
          />
          <input
            className={cx("input")}
            type="date"
            placeholder="Manufacturing Date"
            value={newMedicine.Manufacturing_Date}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                Manufacturing_Date: e.target.value,
              }))
            }
          />
          <input
            className={cx("input")}
            type="date"
            placeholder="Expiry Date"
            value={newMedicine.Expiry_Date}
            onChange={(e) =>
              setNewMedicine((prev) => ({
                ...prev,
                Expiry_Date: e.target.value,
              }))
            }
          />
          <button className={cx("add-btn")} onClick={handleAddMedicine}>
            Add
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={cx("modal")}>
          <div className={cx("modal-content")}>
            <h2>Edit Drug</h2>
            <input
              className={cx("input")}
              type="text"
              value={selectedMedicine.name}
              onChange={(e) =>
                setSelectedMedicine((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <input
              className={cx("input")}
              type="text"
              value={selectedMedicine.Price}
              onChange={(e) =>
                setSelectedMedicine((prev) => ({
                  ...prev,
                  Price: e.target.value,
                }))
              }
            />
            <input
              className={cx("input")}
              type="text"
              placeholder="Unit"
              value={selectedMedicine.Unit}
              onChange={(e) =>
                setSelectedMedicine((prev) => ({
                  ...prev,
                  Unit: e.target.value,
                }))
              }
            />
            <input
              className={cx("input")}
              type="text"
              placeholder="Quantity"
              value={selectedMedicine.QuantityInStock}
              onChange={(e) =>
                setSelectedMedicine((prev) => ({
                  ...prev,
                  QuantityInStock: e.target.value,
                }))
              }
            />
            <div className={cx("modal-actions")}>
              <button className={cx("save-btn")} onClick={handleEditMedicine}>
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
