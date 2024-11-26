package com.introduce2se.seproject.consultation.controller;


import com.introduce2se.seproject.consultation.model.Consultation;
import com.introduce2se.seproject.consultation.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultations")
public class ConsultationController {
    private final ConsultationService consultationService;

    //Constructor
    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    // create consultation
    @PostMapping()
    public ResponseEntity<String> createConsultation(@RequestBody Consultation consultation) {
        int rowsAffected = consultationService.createConsultation(consultation);
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create consultation.");
        }
    }


    // Load consultation List of a user
    @GetMapping("/{user_id}")
    public ResponseEntity<List<Consultation>> getAllConsultations(@PathVariable int user_id) {
        List<Consultation> consultations = consultationService.getUserConsultations(user_id);
        if (consultations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(consultations, HttpStatus.OK);
    }

    //  get a concrete consultation of a concrete user
    @GetMapping("{user_id}/{id}")
    public ResponseEntity<Consultation> GetConsultationById(@PathVariable int id) {
        Consultation consultation = consultationService.getConsultationById(id);
        if (consultation != null) {
            return ResponseEntity.ok(consultation);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update status of a consultation (doctor accept/refuse)
    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateConsultationStatus(@PathVariable int id, @RequestBody String status) {
        int rowsAffected = consultationService.updateStatus(id, status);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Status updated successfully.");
    }

    // Update consultation_result receive from doctor
    @PatchMapping("/{id}/result")
    public ResponseEntity<String> updateConsultationResult(@PathVariable int id, @RequestBody String result) {
        int rowsAffected = consultationService.updateConsultation_result(id, result);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Result updated successfully.");
    }

    //Delete a consultation
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteConsultation(@PathVariable int id) {
        int rowsAffected = consultationService.deleteConsultation(id);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Consultation deleted successfully.");
    }

}
