package com.introduce2se.seproject.account.model;

import lombok.Data;

@Data
public class Admin extends User {
    public Admin()
    {
        super();
    }
    public Admin(User user) {
        super(user.getId(), user.getUserName(), user.getPassWord(), user.getEmail(), user.getFullName(), user.getPhoneNumber(), user.getAddress(), user.getBirthDay(), user.getUserRole(),user.getGender());
    }
}
