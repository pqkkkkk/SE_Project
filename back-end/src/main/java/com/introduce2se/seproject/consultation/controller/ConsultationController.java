package com.introduce2se.seproject.consultation.controller;


import com.introduce2se.seproject.consultation.model.Consultation;
import com.introduce2se.seproject.consultation.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {
    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }
    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createConsultation(@RequestBody Consultation consultation) {
        System.out.println(consultation.getStartTime());
        int rowsAffected = consultationService.createConsultation(consultation);
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("success");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("failed");
        }
    }
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Consultation>> GetAllConsultations(@RequestParam int userId, @RequestParam String userRole , @RequestParam String status) {
        List<Consultation> consultations = consultationService.getFilteredConsultations(userRole, userId, status, null, null, null);
        if (consultations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(consultations, HttpStatus.OK);
    }
    @GetMapping("/week")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Consultation>> GetConsultationsInAWeek(@RequestParam int userId, @RequestParam String userRole, @RequestParam String status, @RequestParam String dateString) {
        LocalDate date = LocalDate.parse(dateString);
        List<Consultation> consultations = consultationService.GetConsultationsInAWeek(userRole, userId, status, date);
        if (consultations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(consultations, HttpStatus.OK);
    }
    @GetMapping("/next")
    @CrossOrigin(origins = "http://localhost:3000")
    public  ResponseEntity<Consultation> GetNextConsultationToday(@RequestParam int userId, @RequestParam String userRole)
    {
        Consultation consultation = consultationService.GetNextConsultationToday(userRole, userId);
        if (consultation != null) {
            return ResponseEntity.ok(consultation);
        }
        else {
            return ResponseEntity.ok().body(null);
        }
    }
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Consultation> GetConsultationById(@PathVariable int id) {
        Consultation consultation = consultationService.getConsultationById(id);
        if (consultation != null) {
            return ResponseEntity.ok(consultation);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> updateConsultationStatus(@PathVariable int id, @RequestBody String status) {
        int rowsAffected = consultationService.updateStatus(id, status);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Status updated successfully.");
    }

    // Update consultation_result receive from doctor
    @PatchMapping("/{id}/result")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> updateConsultationResult(@PathVariable int id, @RequestBody String result) {
        int rowsAffected = consultationService.updateConsultation_result(id, result);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Result updated successfully.");
    }

    //Delete a consultation
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> deleteConsultation(@PathVariable int id) {
        int rowsAffected = consultationService.deleteConsultation(id);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Consultation deleted successfully.");
    }

}
