import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Statistical from "../Statistical/Statistical";
import ManageUser from "../ManageUser/ManageUser";
import ManageDrug from "../ManageDrug/ManageDrug";

const cx = classNames.bind(styles);

const menuLinks = [
    {
        name: "Statistical",
        key: "statistical",
        icon: "fa-chart-simple",
        component: <Statistical />,
    },
    { name: "User", key: "user", icon: "fa-user", component: <ManageUser /> },
    {
        name: "Drug",
        key: "drug",
        icon: "fa-capsules",
        component: <ManageDrug />,
    },
];

function AdminHome() {
    const [activeTab, setActiveTab] = useState(menuLinks[0].key);

    const renderContent = () => {
        const activeLink = menuLinks.find((link) => link.key === activeTab);
        return activeLink ? activeLink.component : null;
    };

    return (
        <main id={cx("adminHome")}>
            <nav className={cx("sidebar")}>
                <header>
                    <div className={cx("image-text")}>
                        <span className={cx("image")}>
                            <img src={images.logo} alt="logo" />
                        </span>

                        <div className={cx("text", "header-text")}>
                            <span className={cx("name")}>Medicare</span>
                        </div>
                    </div>

                    <i
                        className={cx("fa-solid", "fa-chevron-right", "toggle")}
                    ></i>
                </header>

                <div className={cx("menu-bar")}>
                    <div className={cx("menu")}>
                        <li className={cx("search-box")}>
                            <i
                                className={cx(
                                    "fa-solid",
                                    "fa-magnifying-glass",
                                    "icon"
                                )}
                            ></i>
                            <input type="search" placeholder="Search..." />
                        </li>

                        {/* <ul className={cx("menu-links")}>
                            <li className={cx("nav-link")}>
                                <a
                                    onClick={() =>
                                        navigate("/admin/statistical")
                                    }
                                    className={cx("link")}
                                >
                                    <i
                                        className={cx(
                                            "fa-solid",
                                            "fa-chart-simple",
                                            "icon"
                                        )}
                                    ></i>
                                    <span className={cx("text", "nav-text")}>
                                        Statistical
                                    </span>
                                </a>
                            </li>

                            <li className={cx("nav-link")}>
                                <a
                                    onClick={() => navigate("/manage-user")}
                                    className={cx("link")}
                                >
                                    <i
                                        className={cx(
                                            "fa-solid",
                                            "fa-user",
                                            "icon"
                                        )}
                                    ></i>
                                    <span className={cx("text", "nav-text")}>
                                        User
                                    </span>
                                </a>
                            </li>

                            <li className={cx("nav-link")}>
                                <a
                                    onClick={() => navigate("/manage-drug")}
                                    className={cx("link")}
                                >
                                    <i
                                        className={cx(
                                            "fa-solid",
                                            "fa-capsules",
                                            "icon"
                                        )}
                                    ></i>
                                    <span className={cx("text", "nav-text")}>
                                        Drug
                                    </span>
                                </a>
                            </li>
                        </ul> */}
                        <ul className={cx("menu-links")}>
                            {menuLinks.map((link, index) => (
                                <li
                                    key={index}
                                    className={cx("nav-link", {
                                        active: activeTab === link.key,
                                    })}
                                    onClick={() => setActiveTab(link.key)}
                                >
                                    <span className={cx("link")}>
                                        <i
                                            className={cx(
                                                "fa-solid",
                                                link.icon,
                                                "icon"
                                            )}
                                        ></i>
                                        <span
                                            className={cx("text", "nav-text")}
                                        >
                                            {link.name}
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cx("bottom-content")}>
                        <li>
                            <a href="/login" className={cx("link")}>
                                <i
                                    className={cx(
                                        "fa-solid",
                                        "fa-right-from-bracket",
                                        "icon"
                                    )}
                                ></i>
                                <span className={cx("text", "nav-text")}>
                                    Logout
                                </span>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>

            <section className={cx("content")}>{renderContent()}</section>
        </main>
    );
}

export default AdminHome;
