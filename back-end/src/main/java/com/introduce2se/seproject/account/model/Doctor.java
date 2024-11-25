package com.introduce2se.seproject.account.model;

import lombok.Data;

@Data
public class Doctor extends User{
    private int experienceYear;
    private int consultationPrice;
    private double rating;
    private String speciality;

    public Doctor(){
        super();
    }
    public Doctor(User user, int experienceYear, int price, String speciality, double rating){
        super(user.getId(),user.getUserName(),user.getPassWord(),user.getEmail(),user.getFullName(),user.getPhoneNumber(),user.getAddress(),user.getBirthDay(),user.getUserRole(),user.getGender());
        this.experienceYear = experienceYear;
        this.consultationPrice = price;
        this.speciality = speciality;
        this.rating = rating;
    }

}

