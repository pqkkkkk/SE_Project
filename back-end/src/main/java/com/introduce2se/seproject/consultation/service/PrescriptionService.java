package com.introduce2se.seproject.consultation.service;

import com.introduce2se.seproject.consultation.dao.PrescriptionDao;
import com.introduce2se.seproject.consultation.model.Prescription;
import com.introduce2se.seproject.consultation.model.PrescriptionDetail;
import com.introduce2se.seproject.drug.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionDao prescriptionDao;
    private final DrugService drugService;
    @Autowired
    public PrescriptionService(PrescriptionDao prescriptionDao,DrugService drugService) {
        this.prescriptionDao = prescriptionDao;
        this.drugService = drugService;
    }
    // calcultate total price from detail prescription
    public int calculateTotalPrice(List<PrescriptionDetail> details) {
        int totalPrice = 0;
        for (PrescriptionDetail detail : details) {
            int drugPrice = drugService.getPriceByDrugId(detail.getDrugId()); // Lấy giá của thuốc từ DrugService
            totalPrice += drugPrice * detail.getQuantity(); // Tổng giá = giá thuốc * số lượng
        }
        return totalPrice;
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

    public int createPrescription(Prescription prescription, List<PrescriptionDetail> details) {
        int totalPrice = calculateTotalPrice(details);
        prescription.setTotalPrice(totalPrice);
        prescription.setCreatedDay(new Date());

        // Lưu đơn thuốc vào cơ sở dữ liệu
        int prescriptionId = prescriptionDao.createPrescription(prescription);

        // Thêm chi tiết đơn thuốc vào cơ sở dữ liệu
        for (PrescriptionDetail detail : details) {
            detail.setPrescriptionId(prescriptionId);
            prescriptionDao.addPrescriptionDetail(detail);
        }

        return prescriptionId;
    }
    public void addPrescriptionDetail(PrescriptionDetail prescriptionDetail) {
        prescriptionDao.addPrescriptionDetail(prescriptionDetail);
    }
}

