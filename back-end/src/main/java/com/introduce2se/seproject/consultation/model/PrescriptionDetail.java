package com.introduce2se.seproject.consultation.model;

import jakarta.persistence.Id;
import lombok.Data;

@Data
public class PrescriptionDetail {
    @Id
    private int Id;
    private int Quantity;
    private String Usage;
    private int PrescriptionId;
    private int DrugId;
    private String name;
    private int totalPrice;

    public PrescriptionDetail(){

    }
    public PrescriptionDetail(int id, int quantity, String usage, int prescriptionId, int drugId, String drugName, int totalPrice) {
        Id = id;
        Quantity = quantity;
        Usage = usage;
        PrescriptionId = prescriptionId;
        DrugId = drugId;
        this.name = drugName;
        this.totalPrice = totalPrice;
    }
}
