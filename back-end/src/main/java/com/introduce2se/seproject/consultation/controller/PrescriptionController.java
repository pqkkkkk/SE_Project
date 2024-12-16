package com.introduce2se.seproject.consultation.controller;

import com.introduce2se.seproject.consultation.model.*;
import com.introduce2se.seproject.consultation.service.PrescriptionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @Autowired
    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    // create a prescription
    @PostMapping("/create_prescription")
    public ResponseEntity<String> createPrescription(
            @RequestParam int consultationId, // Tham số từ query string (URL)
            @RequestBody List<PrescriptionDetail> details // Tham số từ body
    )
    {
        try {
            System.out.println("Consultation ID: " + consultationId);
            details.forEach(detail -> {
                System.out.println("DrugId: " + detail.getDrugId() +
                        ", Quantity: " + detail.getQuantity() +
                        ", Usage: " + detail.getUsage());
            });

            // Tiến hành tạo prescription và lưu vào DB
            Prescription prescription = new Prescription();
            prescription.setConsultationId(consultationId);
            int prescriptionId = prescriptionService.createPrescription(prescription, details);


            return ResponseEntity.ok("Prescription created");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    // get prescription of a consultation
    @GetMapping("/{consultation_id}")
    public ResponseEntity<Prescription> getPrescriptionByConsultationId(@PathVariable int consultation_id) {
        Prescription prescription = prescriptionService.getPrescriptionByConsultationId(consultation_id);
        if (prescription == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(prescription);
        }
    }

    // get all prescription detail of a prescription
    @GetMapping("/{prescriptionId}/details")
    public ResponseEntity<?> getPrescriptionDetails(@PathVariable int prescriptionId) {
        Prescription prescription = prescriptionService.getPrescriptionById(prescriptionId);
        if (prescription == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Prescription not found.");
        }

        List<PrescriptionDetail> details = prescriptionService.getPrescriptionDetails(prescriptionId);

        Map<String, Object> response = new HashMap<>();
        response.put("prescription", prescription);
        response.put("details", details);

        return ResponseEntity.ok(response);
    }
}