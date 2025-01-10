import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    Application: "application/json",
});

export const GetAllUsers = async () => {
    try {
        const response = await api.get("/account");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const CreatePatient = async (patient) => {
    try {
        const response = await api.post("/account/patient", patient);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const UpdatePatient = async (patient) => {
    try {
        const response = await api.put("/account/patient", patient);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const CreateDoctor = async (doctor) => {
    try {
        const response = await api.post("/account/doctor", doctor);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const UpdateDoctor = async (doctor) => {
    try {
        const response = await api.put("/account/doctor", doctor);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const CreateAdmin = async (admin) => {
    try {
        const response = await api.post("/account/admin", admin);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const UpdateAdmin = async (admin) => {
    try {
        const response = await api.put("/account/admin", admin);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
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
export const GetConsultationById = async (id) => {
    try {
        const response = await api.get(`/consultations/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetAllConsultations = async (userId, userRole, status, date, startTimeValue, endTimeValue) => {
    let url = `/consultations?userId=${userId}&userRole=${userRole}`;
    if (status !== null) {
        url += `&status=${status}`;
    }
    if(date !== null) {
        url += `&date=${date}`;
    }
    if(startTimeValue !== null) {
        url += `&startTimeValue=${startTimeValue}`;
    }
    if(endTimeValue !== null) {
        url += `&endTimeValue=${endTimeValue}`;
    }
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const GetAllConsultationByPatientIdAndDoctorId = async (patientId, doctorId,status) => {
    try {
        const response = await api.get(`/consultations/patient-doctor?patientId=${patientId}&doctorId=${doctorId}&status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export  const UpdateConsultationStatus = async (consultationId, status) => {
    try {
        const response = await api.put(`/consultations/${consultationId}?status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const UpdateConsultationResult = async (consultationId, result) => {
    try {
        const response = await api.put(`/consultations/${consultationId}/result?consultationId=${consultationId}&result=${result}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const  DeleteConsultation = async (consultationId) => {
    try {
        const response = await api.delete(`/consultations/${consultationId}`);
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
export const  CreateDrug = async (drug) => {
    try {
        const response = await api.post("/drugs", drug);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const UpdateDrug = async (drug) => {
    try {
        const response = await api.put("/drugs", drug);
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
export const GetPrescriptionByConsultationId = async (consultationId) => {
    try {
        const url = `/prescriptions/by_consultation/${consultationId}`;
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
export const UpdateAllMissedConsultations = async (userId,userRole) => {
    try {
        const url = `/consultations/missed?userRole=${userRole}&userId=${userId}`;
        const response = await api.put(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const CalculateRevenue = async (year,month, week) => {
    try {
        const url = `/prescriptions/revenue?year=${year}&month=${month}&week=${week}`;
        const response = await api.get(url);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export const CountOnlineConsultations = async (year,month, week) => {
    try {
        const url = `/consultations/online-consultation?year=${year}&month=${month}&week=${week}`;
        const response = await api.get(url);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export const CountPathology = async (year,month, week) => {
    try {
        const url = `/consultations/pathology?year=${year}&month=${month}&week=${week}`;
        const response = await api.get(url);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export const GetFeedbacksByDoctorId = async (doctorId) => {
    try {
        const url = `/account/feedback?doctorId=${doctorId}`;
        const response = await api.get(url);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export const CreateFeedback = async (feedback) => {
    try {
        const url = `/account/feedback`;
        const response = await api.post(url, feedback);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}