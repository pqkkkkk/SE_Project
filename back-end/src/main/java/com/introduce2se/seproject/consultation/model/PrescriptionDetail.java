package com.introduce2se.seproject.consultation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class PrescriptionDetail {
    @Id
    private int Id;
    private int Quantity;
    private String Usage;
    private int PrescriptionId;
    private int DrugId;
    private int totalPrice;

    public PrescriptionDetail(){

    }
    public PrescriptionDetail(int id, int quantity, String usage, int prescriptionId, int drugId) {
        Id = id;
        Quantity = quantity;
        Usage = usage;
        PrescriptionId = prescriptionId;
        DrugId = drugId;
    }
}
