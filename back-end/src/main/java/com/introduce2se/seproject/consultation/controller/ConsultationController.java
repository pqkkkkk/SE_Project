package com.introduce2se.seproject.consultation.controller;


import com.introduce2se.seproject.consultation.model.Consultation;
import com.introduce2se.seproject.consultation.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
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
    public ResponseEntity<List<Consultation>> GetAllConsultations(@RequestParam (required = false) int userId,
                                                                  @RequestParam (required = false) String userRole ,
                                                                  @RequestParam (required = false) String status,
                                                                  @RequestParam (required = false) String date,
                                                                  @RequestParam (required = false) String startTimeValue,
                                                                  @RequestParam (required = false) String endTimeValue) {
        LocalDate consultationDate = (date == null) ? null : LocalDate.parse(date);
        Time startTime = (startTimeValue == null) ? null : Time.valueOf(startTimeValue);
        Time endTime = (endTimeValue == null) ? null : Time.valueOf(endTimeValue);
        List<Consultation> consultations = consultationService.getFilteredConsultations(userRole, userId, status, consultationDate, startTime, endTime);
        if (consultations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(consultations, HttpStatus.OK);
    }
    @GetMapping("/patient-doctor")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Consultation>> GetAllConsultations(@RequestParam int patientId, @RequestParam int doctorId, @RequestParam String status) {
        List<Consultation> consultations = consultationService.GetAllConsultationsByPatientIdAndDoctorId(patientId, doctorId, status);
        return  ResponseEntity.ok().body(consultations);
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

    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> updateConsultationStatus(@PathVariable int id, @RequestParam String status) {
        int rowsAffected = consultationService.updateStatus(id, status);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Updated");
    }

    // Update consultation_result receive from doctor
    @PutMapping("/{id}/result")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> updateConsultationResult(@PathVariable int id, @RequestParam String result) {
        int rowsAffected = consultationService.updateConsultation_result(id, result);
        if (rowsAffected == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("updated");
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
    @PutMapping("/missed")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> UpdateAllMissedConsultations(@RequestParam String userRole, @RequestParam int userId) {
        int result = consultationService.UpdateAllMissedConsultations(userRole, userId);
        if(result == -1)
        {
            return ResponseEntity.badRequest().body(-1);
        }
        return ResponseEntity.ok().body(result);
    }
}
