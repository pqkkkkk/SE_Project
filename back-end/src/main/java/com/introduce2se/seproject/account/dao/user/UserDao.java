package com.introduce2se.seproject.account.dao.user;

import com.introduce2se.seproject.account.model.User;

import java.util.ArrayList;

public interface UserDao {
    public User getUserByUsername(String username);
    public boolean createUser(User user);
    public ArrayList<User> getAllUsers(String role);
}
