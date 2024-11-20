package com.introduce2se.seproject.account.model;

import lombok.Data;

@Data
public class Patient extends User {
    private boolean healthInsurance;

    public Patient(User user, boolean healthInsurance) {
        super(user.getId(), user.getUserName(), user.getPassWord(), user.getUserRole());
        this.healthInsurance = healthInsurance;
    }
}
