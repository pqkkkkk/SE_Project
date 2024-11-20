package com.introduce2se.seproject.account.model;

import lombok.Data;

@Data
public class Admin extends User {
    public Admin(User user) {
        super(user.getId(), user.getUserName(), user.getPassWord(), user.getUserRole());
    }
}
