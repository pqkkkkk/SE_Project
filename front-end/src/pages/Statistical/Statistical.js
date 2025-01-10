import classNames from "classnames/bind";
import styles from "./Statistical.module.scss";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Chart from "chart.js/auto";
import { CalculateRevenue, CountPathology, CountOnlineConsultations,} from "../../services/ApiService";

const cx = classNames.bind(styles);

const MockSummaryData = [
    { title: "Today's Appointment Schedule", value: "25" },
    { title: "Today's Revenue", value: "15.000.000 VND" },
];
const Statistical = () => {
    const [revenue, setRevenue] = useState([]);
    const [onlineConsultation, setOnlineConsultation] = useState([]);
    const [pathology, setPathology] = useState([]);
    const [pathologyYear, setPathologyYear] = useState(2025);
    const [pathologyMonth, setPathologyMonth] = useState(-1);
    const [pathologyWeek, setPathologyWeek] = useState(-1);
    const [revenueYear, setRevenueYear] = useState(2025);
    const [revenueMonth, setRevenueMonth] = useState(-1);
    const [revenueWeek, setRevenueWeek] = useState(-1);
    const [onlineConsultationYear, setOnlineConsultationYear] = useState(2025);
    const [onlineConsultationMonth, setOnlineConsultationMonth] = useState(-1);
    const [onlineConsultationWeek, setOnlineConsultationWeek] = useState(-1);
    const revenueChartRef = useRef(null);
    const bookingsChartRef = useRef(null);
    const appointmentChartRef = useRef(null);
    useEffect(() => {
        return () => {
            destroyChart(revenueChartRef);
            destroyChart(bookingsChartRef);
            destroyChart(appointmentChartRef);
        };
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [revenueData, onlineConsultationData, pathologyData] = await Promise.all([
                    CalculateRevenue(2024, -1, -1),
                    CountOnlineConsultations(2024, -1, -1),
                    CountPathology(2024, -1, -1),
                ]);
                setRevenue(revenueData);
                setOnlineConsultation(onlineConsultationData);
                setPathology(pathologyData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const ctx = document.getElementById("revenueChart").getContext("2d");
        destroyChart(revenueChartRef);
        revenueChartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(revenue),
                datasets: [
                    {
                        label: "Revenue",
                        data: Object.values(revenue),
                        backgroundColor: "rgba(255, 206, 86, 0.8)",
                    },
                ],
            },
        });
    }, [revenue]);
    useEffect(() => {
        const ctx = document.getElementById("onlineConsultationCount").getContext("2d");
        destroyChart(bookingsChartRef);
        bookingsChartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(onlineConsultation),
                datasets: [
                    {
                        label: "Online Consultation Count",
                        data: Object.values(onlineConsultation),
                        backgroundColor: "rgba(255, 99, 132, 0.8)"

                    },
                ],
            },
        });
    }, [onlineConsultation]);
    useEffect(() => {
        const ctx = document.getElementById("pathologyChart").getContext("2d");
        destroyChart(appointmentChartRef);
        appointmentChartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(pathology),
                datasets: [
                    {
                        label: "Pathology Count",
                        data: Object.values(pathology),
                        borderColor: "rgba(54, 162, 235, 0.2)",
                        tension: 0.1,
                    },
                ],
            },
        });
    }, [pathology]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pathologyData = await CountPathology(pathologyYear, pathologyMonth, pathologyWeek);
                setPathology(pathologyData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [pathologyYear]);
    useEffect(() => {
        if(pathologyMonth !== -1) {
            const fetchData = async () => {
                try {
                    const pathologyData = await CountPathology(pathologyYear, pathologyMonth, pathologyWeek);
                    setPathology(pathologyData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [pathologyMonth]);
    useEffect(() => {
        if(pathologyWeek !== -1) {
            const fetchData = async () => {
                try {
                    const pathologyData = await CountPathology(pathologyYear, pathologyMonth, pathologyWeek);
                    setPathology(pathologyData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [pathologyWeek]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const revenueData = await CalculateRevenue(revenueYear, revenueMonth, revenueWeek);
                setRevenue(revenueData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [revenueYear]);
    useEffect(() => {
        if(revenueMonth !== -1) {
            const fetchData = async () => {
                try {
                    const revenueData = await CalculateRevenue(revenueYear, revenueMonth, revenueWeek);
                    setRevenue(revenueData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [revenueMonth]);
    useEffect(() => {
        if(revenueWeek !== -1) {
            const fetchData = async () => {
                try {
                    const revenueData = await CalculateRevenue(revenueYear, revenueMonth, revenueWeek);
                    setRevenue(revenueData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [revenueWeek]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const onlineConsultationData = await CountOnlineConsultations(onlineConsultationYear, onlineConsultationMonth, onlineConsultationWeek);
                setOnlineConsultation(onlineConsultationData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [onlineConsultationYear]);
    useEffect(() => {
        if(onlineConsultationMonth !== -1) {
            const fetchData = async () => {
                try {
                    const onlineConsultationData = await CountOnlineConsultations(onlineConsultationYear, onlineConsultationMonth, onlineConsultationWeek);
                    setOnlineConsultation(onlineConsultationData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [onlineConsultationMonth]);
    useEffect(() => {
        if(onlineConsultationWeek !== -1) {
            const fetchData = async () => {
                try {
                    const onlineConsultationData = await CountOnlineConsultations(onlineConsultationYear, onlineConsultationMonth, onlineConsultationWeek);
                    setOnlineConsultation(onlineConsultationData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [onlineConsultationWeek]);

    const destroyChart = (chartRef) => {
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
    };
    const handleRefreshAllPathologyMode = () => {
        setPathologyYear(-1);
        setPathologyMonth(-1);
        setPathologyWeek(-1);
    };
    const handleRefreshAllRevenueMode = () => {
        setRevenueYear(-1);
        setRevenueMonth(-1);
        setRevenueWeek(-1);
    }
    const handleRefreshAllOnlineConsultationMode = () => {
        setOnlineConsultationYear(-1);
        setOnlineConsultationMonth(-1);
        setOnlineConsultationWeek(-1);
    }
    return (
        <main id={cx("statistical")}>
            <header className={cx("header")}>
                <h1>System Statistics</h1>
            </header>

            <div className={cx("container")}>
                <div className={cx("cards")}>
                    {MockSummaryData.map((item, index) => (
                        <div className={cx("card", `card-${index}`)} key={index}>
                            <h2>{item.title}</h2>
                            <p className={cx("stat")}>{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className={cx("charts")}>
                    <div className={cx("chart-container")}>
                        <div className={cx("title")}>
                            <h3>Pathology Rate</h3>
                            <div className={cx("modes")}>
                                <select value={pathologyYear} className={cx("year-mode")}
                                        onChange={(e) =>{
                                            setPathologyYear(e.target.value);
                                        }}>
                                    <option value={-1}>Select year</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                                <select
                                    disabled={pathologyYear === -1}
                                    value={pathologyMonth} className={cx("month-mode")}
                                    onChange={(e) =>{
                                        setPathologyMonth(e.target.value);
                                    } }>
                                    <option value="-1">Select month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select
                                    disabled={pathologyMonth === -1}
                                    value={pathologyWeek} className={cx("week-mode")}
                                    onChange={(e) =>{
                                        setPathologyWeek(e.target.value);
                                    }}>
                                    <option value="-1">Select week</option>
                                    <option value="1">Week 1</option>
                                    <option value="2">Week 2</option>
                                    <option value="3">Week 3</option>
                                    <option value="4">Week 4</option>
                                </select>
                                <button
                                    onClick={handleRefreshAllPathologyMode}
                                    className={cx("refresh")}>
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div>
                        <canvas id="pathologyChart"></canvas>
                    </div>

                    <div className={cx("chart-container")}>
                        <div className={cx("title")}>
                            <h3>Revenue Chart</h3>
                            <div className={cx("modes")}>
                                <select value={revenueYear} className={cx("year-mode")}
                                        onChange={(e) => {
                                            setRevenueYear(e.target.value);
                                        }}>
                                    <option value={-1}>Select year</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                                <select
                                    disabled={revenueYear === -1}
                                    value={revenueMonth} className={cx("month-mode")}
                                    onChange={(e) => {
                                        setRevenueMonth(e.target.value);
                                    }}>
                                    <option value="-1">Select month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select
                                    disabled={revenueMonth === -1}
                                    value={revenueWeek} className={cx("week-mode")}
                                    onChange={(e) => {
                                        setRevenueWeek(e.target.value);
                                    }}>
                                    <option value="-1">Select week</option>
                                    <option value="1">Week 1</option>
                                    <option value="2">Week 2</option>
                                    <option value="3">Week 3</option>
                                    <option value="4">Week 4</option>
                                </select>
                                <button
                                    onClick={handleRefreshAllRevenueMode}
                                    className={cx("refresh")}>
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div>
                        <canvas id="revenueChart"></canvas>
                    </div>

                    <div className={cx("chart-container")}>
                        <div className={cx("title")}>
                            <h3>Online Consultation Count Chart</h3>
                            <div className={cx("modes")}>
                                <select value={onlineConsultationYear} className={cx("year-mode")}
                                        onChange={(e) => {
                                            setOnlineConsultationYear(e.target.value);
                                        }}>
                                    <option value={-1}>Select year</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                                <select
                                    disabled={onlineConsultationYear === -1}
                                    value={onlineConsultationMonth} className={cx("month-mode")}
                                    onChange={(e) => {
                                        setOnlineConsultationMonth(e.target.value);
                                    }}>
                                    <option value="-1">Select month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select
                                    disabled={onlineConsultationMonth === -1}
                                    value={onlineConsultationWeek} className={cx("week-mode")}
                                    onChange={(e) => {
                                        setOnlineConsultationWeek(e.target.value);
                                    }}>
                                    <option value="-1">Select week</option>
                                    <option value="1">Week 1</option>
                                    <option value="2">Week 2</option>
                                    <option value="3">Week 3</option>
                                    <option value="4">Week 4</option>
                                </select>
                                <button
                                    onClick={handleRefreshAllOnlineConsultationMode}
                                    className={cx("refresh")}>
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div>
                        <canvas id="onlineConsultationCount"></canvas>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Statistical;
