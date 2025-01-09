package com.introduce2se.seproject.consultation.service;

import com.introduce2se.seproject.consultation.dao.PrescriptionDao;
import com.introduce2se.seproject.consultation.model.Prescription;
import com.introduce2se.seproject.consultation.model.PrescriptionDetail;
import com.introduce2se.seproject.drug.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PrescriptionService {

    private final PrescriptionDao prescriptionDao;
    private final DrugService drugService;

    @Autowired
    public PrescriptionService(PrescriptionDao prescriptionDao, DrugService drugService) {
        this.prescriptionDao = prescriptionDao;
        this.drugService = drugService;
    }
    public int calculateTotalPrice(List<PrescriptionDetail> details) {
        int totalPrice = 0;
        for (PrescriptionDetail detail : details) {
            int drugPrice = drugService.getPriceByDrugId(detail.getDrugId());
            totalPrice += drugPrice * detail.getQuantity();
        }
        return totalPrice;
    }
    public Prescription getPrescriptionByConsultationId(int consultation_id) {
        return prescriptionDao.getPrescriptionByConsultationId(consultation_id);
    }
    public List<PrescriptionDetail> getPrescriptionDetails(int prescriptionId) {
        return prescriptionDao.getPrescriptionDetails(prescriptionId);
    }
    public Prescription getPrescriptionById(int prescriptionId) {
        return prescriptionDao.getPrescriptionById(prescriptionId);
    }

    public int createPrescription(Prescription prescription, List<PrescriptionDetail> details) {
        int totalPrice = calculateTotalPrice(details);
        prescription.setTotalPrice(totalPrice);
        prescription.setCreatedDay(new Date());
        int prescriptionId = prescriptionDao.createPrescription(prescription);

        for (PrescriptionDetail detail : details) {
            detail.setPrescriptionId(prescriptionId);
            prescriptionDao.addPrescriptionDetail(detail);
        }
        return prescriptionId;
    }
    public void addPrescriptionDetail(PrescriptionDetail prescriptionDetail) {
        prescriptionDao.addPrescriptionDetail(prescriptionDetail);
    }
    public List<Prescription> GetPrescriptionsByPatientId(int patientId, String consultationStatus, String prescriptionStatus) {
        return prescriptionDao.GetPrescriptionsOfPatient(patientId, consultationStatus, prescriptionStatus);
    }
    public int UpdateStatus(int prescriptionId, String status) {
        try {
            prescriptionDao.updatePrescriptionStatus(prescriptionId, status);
            return 1;
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return 0;
        }
    }
    public Map<Integer,Integer> calculateRevenue(int year,int month,int week) {
        Map<Integer, Integer> revenue = new HashMap<>();
        if (week == -1 && month == -1)
        {
            revenue = prescriptionDao.calculateRevenueByYear(year);
            for (int i = 1; i <= 12; i++) {
                if (!revenue.containsKey(i)) {
                    revenue.put(i, 0);
                }
            }
        } else if (week == -1)
        {
            revenue = prescriptionDao.calculateRevenueByMonth(year, month);
            for (int i = 1; i <= 5; i++)
            {
                if (!revenue.containsKey(i)) {
                    revenue.put(i, 0);
                }
            }
        } else
        {
            revenue = prescriptionDao.calculateRevenueByWeek(year, month, week);
            for (int i = 1; i <= 7; i++) {
                if (!revenue.containsKey(i)) {
                    revenue.put(i, 0);
                }
            }
        }
        return revenue;
    };
}

