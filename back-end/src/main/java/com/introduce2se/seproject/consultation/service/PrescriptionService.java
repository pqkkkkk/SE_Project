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
    private  static final Map<Integer, String> monthMap = new HashMap<>();
    {
        monthMap.put(1, "January");
        monthMap.put(2, "February");
        monthMap.put(3, "March");
        monthMap.put(4, "April");
        monthMap.put(5, "May");
        monthMap.put(6, "June");
        monthMap.put(7, "July");
        monthMap.put(8, "August");
        monthMap.put(9, "September");
        monthMap.put(10, "October");
        monthMap.put(11, "November");
        monthMap.put(12, "December");
    }
    private static final Map<Integer, String> weekMap = new HashMap<>();
    {
        weekMap.put(1, "First Week");
        weekMap.put(2, "Second Week");
        weekMap.put(3, "Third Week");
        weekMap.put(4, "Fourth Week");
        weekMap.put(5, "Fifth Week");
    }
    private static final Map<Integer, String> dayMap = new HashMap<>();
    {
        dayMap.put(1, "Monday");
        dayMap.put(2, "Tuesday");
        dayMap.put(3, "Wednesday");
        dayMap.put(4, "Thursday");
        dayMap.put(5, "Friday");
        dayMap.put(6, "Saturday");
        dayMap.put(7, "Sunday");
    }
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
    public Map<String,Integer> calculateRevenue(int year,int month,int week) {
        Map<String, Integer> revenue = new HashMap<>();
        if (week == -1 && month == -1)
        {
            Map<Integer,Integer> rawData = prescriptionDao.calculateRevenueByYear(year);
            for (int i = 1; i <= 12; i++) {
                if (!rawData.containsKey(i)) {
                    revenue.put(monthMap.get(i), 0);
                }
                else{
                    revenue.put(monthMap.get(i), rawData.get(i));
                }
            }
        } else if (week == -1)
        {
            Map<Integer,Integer> rawData = prescriptionDao.calculateRevenueByMonth(year, month);
            for (int i = 1; i <= 5; i++)
            {
                if (!rawData.containsKey(i)) {
                    revenue.put(weekMap.get(i), 0);
                }
                else {
                    revenue.put(weekMap.get(i), rawData.get(i));
                }
            }
        } else
        {
            Map<Integer,Integer> rawData = prescriptionDao.calculateRevenueByWeek(year, month, week);
            for (int i = 1; i <= 7; i++) {
                if (!rawData.containsKey(i)) {
                    revenue.put(dayMap.get(i), 0);
                }
                else {
                    revenue.put(dayMap.get(i), rawData.get(i));
                }
            }
        }
        return revenue;
    };
}

