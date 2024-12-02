package com.introduce2se.seproject.drug.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="DrugType")
public class DrugType {
    @Id
    private String DrugTypeName;
}
