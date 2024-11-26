package com.introduce2se.seproject.consultation.service;

import com.introduce2se.seproject.consultation.dao.ConsultationDao;
import com.introduce2se.seproject.consultation.model.Consultation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultationService {
    private final ConsultationDao consultationDao;

    public ConsultationService(ConsultationDao consultationDao) {
        this.consultationDao = consultationDao;
    }

    // get consultation list
    public List<Consultation> getUserConsultations(int user_id) {
        return consultationDao.getUserConsultations(user_id);
    }

    // Create a consultation
    public int createConsultation(Consultation consultation){
        return consultationDao.createConsultation(consultation);
    }

    // get consultation by ID
    public Consultation getConsultationById(int id) {
        return consultationDao.getConsultationByID(id);
    }

    // Update status of a consultation (doctor accept/refuse)
    public int updateStatus(int id, String status) {
        return consultationDao.updateStatus(id, status);
    }

    // Update consultation_result receive from doctor
    public int updateConsultation_result(int id, String result){
        return consultationDao.updateConsultation_result(id, result);
    }

    // Delete a consultation
    public int deleteConsultation(int id) {
        return consultationDao.deleteConsultation(id);
    }
}
