package com.introduce2se.seproject.drug.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class Drug {
    @Id
    private int DrugId;
    private String Name;
    private String Unit;
    private int Price;
    private int Quantity;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate Manufactoring_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate Expiry_date;
    private String DrugTypeName;
}
