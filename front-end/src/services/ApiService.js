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
export const CreateConsultation = async (consultation) => {
    try {
        const response = await api.post("/consultations", consultation);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetAllDrugs = async () => {
    try {
        const response = await api.get("/drugs");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetDrugById = async (id) => {
    try {
        const response = await api.get(`/drugs/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const SavePrescription = async (prescription, consultationId) => {
    try {
        const url = `/prescriptions?consultationId=${consultationId}`;
        const response = await api.post(url, prescription);
        return response.data;
    } catch (error) {
        console.error(error);
        return "Error in server";
    }
}
export const UpdatePrescriptionStatus = async (prescriptionId, status) => {
    try {
        const url = `/prescriptions/status?prescriptionId=${prescriptionId}&status=${status}`;
        const response = await api.put(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetPrescriptionByPatientId = async (patientId, consultationStatus, prescriptionStatus) => {
    try {
        const url = `/prescriptions/patient?patientId=${patientId}&consultationStatus=${consultationStatus}&prescriptionStatus=${prescriptionStatus}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetPrescriptionDetail = async (prescriptionId) => {
    try {
        const url = `/prescriptions/details?prescriptionId=${prescriptionId}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetConnectingUsers = async (currentUserId, currentRole) => {
    try {
        const url = `/account/connectingUsers?currentUserId=${currentUserId}&currentRole=${currentRole}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetMessagesHistory = async (currentUserId, oppositeUserId) => {
    try {
        const url = `/messages?currentUserId=${currentUserId}&oppositeUserId=${oppositeUserId}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const CreatePaymentUrl = async (paymentInfo) => {
    try {
        const url = `/payment/create_payment_url`;
        const response = await api.post(url,paymentInfo);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}