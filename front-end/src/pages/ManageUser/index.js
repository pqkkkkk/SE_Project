import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";

const cx = classNames.bind(styles);

function ManageUser() {
    const [users, setUsers] = useState([
        { id: 1, name: "Doctor Le Bao", email: "lebao@exam.com", role: "Admin" },
        { id: 2, name: "Doctor James", email: "james@exam.com", role: "Doctor" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: "", name: "", email: "", role: "Admin" });

    const handleOpenModal = () => {
        setFormData({ id: "", name: "", email: "", role: "Admin" });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            // Update existing user
            setUsers((prev) =>
                prev.map((user) => (user.id === parseInt(formData.id) ? formData : user))
            );
        } else {
            // Add new user
            setUsers((prev) => [
                ...prev,
                { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
            ]);
        }
        handleCloseModal();
    };

    const handleEditUser = (user) => {
        setFormData(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    return (
        <div className={cx("container")}>
            <div>
                <h1 className={cx("header")}>Manage User</h1>
                <button className={cx("addUserBtn")} onClick={handleOpenModal}>
                    Add User
                </button>
                <table className={cx("userTable")}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className={cx("editBtn")}
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={cx("editBtn")}
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className={cx("overlay")}>
                    <div className={cx("modal")}>
                        <span className={cx("close")} onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2 className={cx("add-header")}>Add User</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className={cx("form-group")}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label htmlFor="role">Role:</label>
                                <select
                                    id="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Patient">Patient</option>
                                </select>
                            </div>
                            <button className={cx("addUserBtn")} type="submit">Add</button>
                            
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageUser;
