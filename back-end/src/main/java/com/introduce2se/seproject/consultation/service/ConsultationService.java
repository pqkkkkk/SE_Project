package com.introduce2se.seproject.consultation.service;

import com.introduce2se.seproject.consultation.dao.ConsultationDao;
import com.introduce2se.seproject.consultation.model.Consultation;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class ConsultationService {
    private final ConsultationDao consultationDao;

    public ConsultationService(ConsultationDao consultationDao) {
        this.consultationDao = consultationDao;
    }

    public List<Consultation> GetAllConsultationsByPatientIdAndDoctorId(int patientId, int doctorId, String status) {
        return consultationDao.GetAllConsultationsByPatientIdAndDoctorId(patientId,doctorId, status);
    }
    public int createConsultation(Consultation consultation){
        return consultationDao.createConsultation(consultation);
    }
    public Consultation getConsultationById(int id) {
        return consultationDao.getConsultationByID(id);
    }
    public int updateStatus(int id, String status) {
        return consultationDao.updateStatus(id, status);
    }
    public int updateConsultation_result(int id, String result){
        return consultationDao.updateConsultation_result(id, result);
    }
    public int deleteConsultation(int id) {
        return consultationDao.deleteConsultation(id);
    }
    public List<Consultation> getFilteredConsultations(String userRole, int userId, String status, LocalDate consultationDate, Time startTime, Time endTime) {
        return consultationDao.GetFilteredConsultations(userRole, userId, status, consultationDate, startTime, endTime);
    }
    public List<Consultation> GetConsultationsInAWeek(String userRole, int userId, String status, LocalDate date) {
        return consultationDao.GetConsultationsInAWeek(userRole, userId, status, date);
    }
    public Consultation GetNextConsultationToday(String userRole, int userId) {
        return consultationDao.GetNextConsultationToday(userRole, userId);
    }
    public int UpdateAllMissedConsultations(String userRole, int userId) {
        int result = consultationDao.UpdateAllMissedConsultation(userRole, userId);
        return result;
    }
}
