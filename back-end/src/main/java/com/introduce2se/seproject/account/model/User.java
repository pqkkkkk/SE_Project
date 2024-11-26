package com.introduce2se.seproject.account.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class User {
    private int id;
    private String userName;
    private String passWord;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String address;
    private Date birthDay;
    private String userRole;
    private String gender;
    public User(){}
}
