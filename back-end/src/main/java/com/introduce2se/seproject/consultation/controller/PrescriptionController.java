package com.introduce2se.seproject.consultation.controller;

import com.introduce2se.seproject.consultation.model.*;
import com.introduce2se.seproject.consultation.service.PrescriptionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @Autowired
    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createPrescription(
            @RequestParam int consultationId,
            @RequestBody List<PrescriptionDetail> details
    )
    {
        try {
            System.out.println("Consultation ID: " + consultationId);
            details.forEach(detail -> {
                System.out.println("DrugId: " + detail.getDrugId() +
                        ", Quantity: " + detail.getQuantity() +
                        ", Usage: " + detail.getUsage());
            });

            Prescription prescription = new Prescription();
            prescription.setConsultationId(consultationId);
            int prescriptionId = prescriptionService.createPrescription(prescription, details);
            return ResponseEntity.ok("Created");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed");
        }
    }
    @PutMapping("/status")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> UpdateStatus(@RequestParam int prescriptionId, @RequestParam String status)
    {
      int result = prescriptionService.UpdateStatus(prescriptionId, status);
        if (result == 1) {
            return ResponseEntity.ok().body(result);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }
    @GetMapping("/{consultation_id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Prescription> getPrescriptionByConsultationId(@PathVariable int consultation_id) {
        Prescription prescription = prescriptionService.getPrescriptionByConsultationId(consultation_id);
        if (prescription == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(prescription);
        }
    }

    @GetMapping("/details")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getPrescriptionDetails(@RequestParam int prescriptionId) {
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
    @GetMapping("/patient")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Prescription>> GetPrescriptionsByPatientId(@RequestParam int patientId, @RequestParam String consultationStatus, @RequestParam String prescriptionStatus) {
        List<Prescription> prescriptions = prescriptionService.GetPrescriptionsByPatientId(patientId, consultationStatus, prescriptionStatus);
        if (prescriptions == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(prescriptions);
    }
}