package com.introduce2se.seproject.account.model;

import lombok.Data;

@Data
public class Doctor extends User{
    private int experienceYear;
    private int price;
    private String speciality;

    public Doctor(User user, int experienceYear, int price, String speciality){
        super(user.getId(), user.getUserName(), user.getPassWord(), user.getUserRole());
        this.experienceYear = experienceYear;
        this.price = price;
        this.speciality = speciality;
    }
}
