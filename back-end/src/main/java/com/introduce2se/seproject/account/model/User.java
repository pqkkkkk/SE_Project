package com.introduce2se.seproject.account.model;

import lombok.Data;

import java.util.Date;

@Data
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
    public User(){
        id = 0;
        userName = "";
        passWord = "";
        email = "";
        userRole = "";
    }
    public User(int id, String username, String password, String userRole){
        this.id = id;
        this.userName = username;
        this.passWord = password;
        this.userRole = userRole;
    }

}
