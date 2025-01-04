package com.introduce2se.seproject.consultation.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.sql.Time;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class Consultation {
    private int ConsultationId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate ConsultationDate;
    private Time StartTime;
    private Time EndTime;
    private String Form;
    private String Status;
    private int PatientId;
    private String patientName;
    private int DoctorId;
    private String doctorName;
    private String ConsultationResult;
    private String Reason;
    public Consultation(){}
}
