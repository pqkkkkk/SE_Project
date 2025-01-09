import {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import {GetAllUsers,
    CreateAdmin, UpdateAdmin,
    UpdateDoctor, UpdatePatient,
    CreateDoctor, CreatePatient} from "../../services/ApiService";

const cx = classNames.bind(styles);

const mockUserData = [
    { id: 1, name: "Doctor Le Bao", email: "lebao@exam.com", role: "Admin" },
    { id: 2, name: "Doctor James", email: "james@exam.com", role: "Doctor" },
    ];
function ManageUser() {
    const basicUser = {userName:"", passWord:"", email:"",
                            fullName:"", phoneNumber:"", address:"",
                            birthDay:"", gender:""};
    const [users, setUsers] = useState([]);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedSelectedUser, setUpdatedSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState([]);
    const [isOpenNewUserModal, setIsOpenNewUserModal] = useState(false);
    const [userRole, setUserRole] = useState("patient");
    useEffect(() => {
        GetAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        if(userRole === "patient") {
            setNewUser({...basicUser, healthInsurance:true});
        }
        if(userRole === "doctor") {
            setNewUser({...basicUser, experienceYear: 0, consultationPrice: 0, rating: 0,speciality: ""});
        }
        if(userRole === "admin") {
            setNewUser({...basicUser});
        }
    }, [userRole]);
    const handleOpenNewUserModal = () => {
        setIsOpenNewUserModal(true);
    };
    const handleCloseNewUserModal = () => {
        setIsOpenNewUserModal(false);
    }
    const handleCloseEditUserModal = () => setIsEditUserModalOpen(false);
    const handleEditUser = (user) => {
        setUpdatedSelectedUser(user);
        setIsEditUserModalOpen(true);
    };
    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };
    const handleUpdateUser = (e) => {
        e.preventDefault();
        if (updatedSelectedUser.userRole === "doctor") {
            UpdateDoctor(updatedSelectedUser)
                .then((response) => {
                    if (response === 1) {
                        alert("Update doctor successfully");
                        setUsers((prev) =>
                            prev.map((user) =>
                                user.id === updatedSelectedUser.id ? updatedSelectedUser : user
                            )
                        );
                        setIsEditUserModalOpen(false);
                    } else {
                        alert("Update doctor failed");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (updatedSelectedUser.userRole === "patient") {
            UpdatePatient(updatedSelectedUser)
                .then((response) => {
                    if (response === 1) {
                        alert("Update patient successfully");
                        setUsers((prev) =>
                            prev.map((user) =>
                                user.id === updatedSelectedUser.id ? updatedSelectedUser : user
                            )
                        );
                        setIsEditUserModalOpen(false);
                    } else {
                        alert("Update patient failed");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (updatedSelectedUser.userRole === "admin") {
            UpdateAdmin(updatedSelectedUser)
                .then((response) => {
                    if (response === 1) {
                        alert("Update admin successfully");
                        setUsers((prev) =>
                            prev.map((user) =>
                                user.id === updatedSelectedUser.id ? updatedSelectedUser : user
                            )
                        );
                        setIsEditUserModalOpen(false);
                    } else {
                        alert("Update admin failed");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    const handleCreateUser = async (e) => {
        e.preventDefault();
        const doctor = {...newUser, userRole: userRole};
        if (userRole === "doctor") {
           const response = await CreateDoctor(doctor);
           if(response === 1)
           {
               alert("Create doctor successfully");
                setUsers((prev) => [...prev, newUser]);
                setNewUser([]);
                setIsOpenNewUserModal(false);
           }
              else {
                alert("Create doctor failed");
              }
        }
        if (userRole === "patient") {
            const patient = {...newUser, userRole: userRole};
            const response = await CreatePatient(patient);
            if(response === 1)
            {
                alert("Create patient successfully");
                setUsers((prev) => [...prev, newUser]);
                setNewUser([]);
                setIsOpenNewUserModal(false);
            }
            else {
                alert("Create patient failed");
            }
        }
        if (userRole === "admin") {
            const admin = {...newUser, userRole: userRole};
            const response = await CreateAdmin(admin);
            if(response === 1)
            {
                alert("Create admin successfully");
                setUsers((prev) => [...prev, newUser]);
                setNewUser([]);
                setIsOpenNewUserModal(false);
            }
            else {
                alert("Create admin failed");
            }
        }
    }
    return (
        <div className={cx("container")}>
            <div>
                <h1 className={cx("header")}>Manage User</h1>
                <button className={cx("addUserBtn")} onClick={handleOpenNewUserModal}>
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
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.userRole}</td>
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

            {isEditUserModalOpen && (
                <div className={cx("overlay")}>
                    <div className={cx("modal")}>
                        <span className={cx("close")} onClick={handleCloseEditUserModal}>
                            &times;
                        </span>
                        <h2 className={cx("add-header")}>User Information</h2>
                        <form onSubmit={handleUpdateUser}>
                            {Object.keys(updatedSelectedUser).map((key) => (
                                <div key={key} className={cx("form-group")}>
                                    <label htmlFor={key}>{key.toUpperCase()}:</label>
                                    <input
                                        type="text"
                                        id={key}
                                        value={updatedSelectedUser[key]}
                                        onChange={(e) =>{
                                            setUpdatedSelectedUser((prev) => ({ ...prev, [key]: e.target.value }));
                                        }}
                                    />
                                </div>
                            ))
                            }
                            <button className={cx("addUserBtn")} onClick={(e) =>handleUpdateUser(e)} type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}
            {isOpenNewUserModal && (
                <div className={cx("overlay")}>
                    <div className={cx("modal")}>
                        <span className={cx("close")} onClick={handleCloseNewUserModal}>
                            &times;
                        </span>
                        <h2 className={cx("add-header")}>Add New User</h2>
                        <form onSubmit={handleCreateUser}>
                            <div  className={cx("form-group")}>
                                <label htmlFor={userRole}>Role:</label>
                                <select
                                    value={userRole}
                                    onChange={(e) => {
                                        setUserRole(e.target.value);
                                    }}>
                                    <option value="patient">Patient</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {Object.keys(newUser).map((propertyName) => {
                                if (propertyName === "role") {
                                    return (
                                        <div key={propertyName} className={cx("form-group")}>
                                            <label htmlFor={propertyName}>{propertyName.toUpperCase()}:</label>
                                            <select
                                                id={propertyName}
                                                value={newUser[propertyName]}
                                                onChange={(e) => {
                                                    setNewUser((prev) => ({ ...prev, role: e.target.value }));
                                                }}>
                                                <option value="patient">Patient</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={propertyName} className={cx("form-group")}>
                                            <label htmlFor={propertyName}>{propertyName.toUpperCase()}:</label>
                                            <input
                                                type="text"
                                                id={propertyName}
                                                value={newUser[propertyName]}
                                                onChange={(e) => {
                                                    setNewUser((prev) => ({ ...prev, [propertyName]: e.target.value }));
                                                }}
                                            />
                                        </div>
                                    )
                                }
                            })}

                            <button className={cx("addUserBtn")} type="submit">Create</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageUser;
