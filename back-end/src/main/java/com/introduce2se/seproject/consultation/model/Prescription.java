package com.introduce2se.seproject.consultation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "prescription", schema="dbo")
public class Prescription {
    @Id
    private int PrescriptionId;
    private int TotalPrice;
    private Date CreatedDay;
    private int ConsultationId;
    private String status;

    public Prescription(){}

    public Prescription(int prescription_id, int total_price, Date created_Date, int consultation_Id) {
        PrescriptionId = prescription_id;
        TotalPrice = total_price;
        CreatedDay = created_Date;
        ConsultationId = consultation_Id;
    }


}
