import classNames from "classnames/bind";
import styles from "./Statistical.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const cx = classNames.bind(styles);

const Statistical = () => {
    const summaryData = [
        { title: "Today's Appointment Schedule", value: "25" },
        { title: "New Account", value: "10" },
        { title: "Today's Revenue", value: "15.000.000 VND" },
        { title: "Bookings Chart", value: "50" },
    ];

    let appointmentChart, revenueChart, newAccountChart, bookingsChart;

    useEffect(() => {
        const ctx1 = document
            .getElementById("appointmentChart")
            .getContext("2d");
        if (appointmentChart) {
            appointmentChart.destroy();
        }
        appointmentChart = new Chart(ctx1, {
            type: "line",
            data: {
                labels: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                datasets: [
                    {
                        label: "Appointment Schedule",
                        data: [12, 19, 3, 5, 2, 3, 10],
                        fill: false,
                        borderColor: "rgba(54, 162, 235, 0.2)",
                        tension: 0.1,
                    },
                ],
            },
        });

        const ctx2 = document.getElementById("revenueChart").getContext("2d");
        if (revenueChart) {
            revenueChart.destroy();
        }
        revenueChart = new Chart(ctx2, {
            type: "bar",
            data: {
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                    {
                        label: "Revenue",
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: "rgba(255, 206, 86, 0.8)",
                    },
                ],
            },
        });

        const ctx3 = document
            .getElementById("newAccountChart")
            .getContext("2d");
        if (newAccountChart) {
            newAccountChart.destroy();
        }
        newAccountChart = new Chart(ctx3, {
            type: "pie",
            data: {
                labels: ["Today", "This Week", "This Month"],
                datasets: [
                    {
                        label: "New Account",
                        data: [300, 50, 100],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.8)",
                            "rgba(54, 162, 235, 0.8)",
                            "rgba(255, 206, 86, 0.8)",
                        ],
                    },
                ],
            },
        });

        const ctx4 = document.getElementById("bookingsChart").getContext("2d");
        if (bookingsChart) {
            bookingsChart.destroy();
        }
        bookingsChart = new Chart(ctx4, {
            type: "doughnut",
            data: {
                labels: ["Done", "Accepted", "Missed"],
                datasets: [
                    {
                        label: "Bookings",
                        data: [300, 50, 100],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.8)",
                            "rgba(54, 162, 235, 0.8)",
                            "rgba(255, 206, 86, 0.8)",
                        ],
                    },
                ],
            },
        });
    }, []);

    return (
        <main id={cx("statistical")}>
            <header className={cx("header")}>
                <h1>System Statistics</h1>
            </header>

            <div className={cx("container")}>
                <div className={cx("cards")}>
                    {summaryData.map((item, index) => (
                        <div
                            className={cx("card", `card-${index}`)}
                            key={index}
                        >
                            <h2>{item.title}</h2>
                            <p className={cx("stat")}>{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className={cx("charts")}>
                    <div className={cx("chart-container")}>
                        <h3>Appointment Schedule Chart</h3>
                        <canvas id="appointmentChart"></canvas>
                    </div>

                    <div className={cx("chart-container")}>
                        <h3>Revenue Chart</h3>
                        <canvas id="revenueChart"></canvas>
                    </div>

                    <div className={cx("chart-container")}>
                        <h3>New Account Chart</h3>
                        <canvas id="newAccountChart"></canvas>
                    </div>

                    <div className={cx("chart-container")}>
                        <h3>Bookings Chart</h3>
                        <canvas id="bookingsChart"></canvas>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Statistical;
