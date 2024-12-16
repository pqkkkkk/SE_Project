import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    Application: "application/json",
});

export const getAllDoctors = async () => {
    try {
        const response = await api.get("/account/allDoctors");
        return response.data;
    } catch (error) {
        console.log(error);
        return[];
    }
};
export  const getUserById = async (id) => {
    try {
        const response = await api.get(`/account/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const login = async (username, password) => {
    try {
        const response = await api.post("/security/login", { username, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
