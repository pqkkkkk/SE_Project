package com.introduce2se
        .seproject.consultation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
@Setter
@Getter
@Entity
@Table(name = "consultation", schema="dbo")
public class Consultation {
    @Id
    private int ConsultationId;
    private Date ConsultationDate;
    private Time StartTime;
    private Time EndTime;
    private String Form;
    private String Status;
    private String PatientId;
    private String DoctorId;
    private String ConsultationResult;
    private String Reason;

    //Constructor
    public Consultation(){}
    public Consultation(int consultationId, Date date ,Time start_time, Time end_time,
                        String form, String status, String patientId,
                        String doctorId, String consultation_Result, String reason) {
        ConsultationId = consultationId;
        ConsultationDate = date;
        StartTime = start_time;
        EndTime = end_time;
        Form = form;
        Status = status;
        PatientId = patientId;
        DoctorId = doctorId;
        ConsultationResult = consultation_Result;
        Reason = reason;
    }
}
