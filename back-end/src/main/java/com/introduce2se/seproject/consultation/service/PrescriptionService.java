package com.introduce2se.seproject.consultation.service;

import com.introduce2se.seproject.consultation.dao.PrescriptionDao;
import com.introduce2se.seproject.consultation.model.Prescription;
import com.introduce2se.seproject.consultation.model.PrescriptionDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionDao prescriptionDao;

    @Autowired
    public PrescriptionService(PrescriptionDao prescriptionDao) {
        this.prescriptionDao = prescriptionDao;
    }
    // Get prescription by consultation id
    public Prescription getPrescriptionByConsultationId(int consultation_id) {
        return prescriptionDao.getPrescriptionByConsultationId(consultation_id);
    }

    // Get all prescription detail of a prescription
    public List<PrescriptionDetail> getPrescriptionDetails(int prescriptionId) {
        return prescriptionDao.getPrescriptionDetails(prescriptionId);
    }
    // get a prescription by id
    public Prescription getPrescriptionById(int prescriptionId){
        return prescriptionDao.getPrescriptionById(prescriptionId);
    }

    public int createPrescription(Prescription prescription) {
        return prescriptionDao.createPrescription(prescription);
    }

    public void addPrescriptionDetail(PrescriptionDetail prescriptionDetail) {
        prescriptionDao.addPrescriptionDetail(prescriptionDetail);
    }
}

