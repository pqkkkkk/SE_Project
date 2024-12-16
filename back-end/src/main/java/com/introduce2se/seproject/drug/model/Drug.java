package com.introduce2se.seproject.drug.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@Table(name="Drug")
public class Drug {
    @Id
    private int DrugId;
    private String Name;
    private String Unit;
    private int Price;
    private int Quantity;
    private Date Manufactoring_date;
    private Date Expiry_date;
    private String DrugTypeName;
}
