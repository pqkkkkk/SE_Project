package com.introduce2se.seproject.account;

import com.introduce2se.seproject.account.dao.user.UserDao;
import com.introduce2se.seproject.account.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AccountService {

    private final UserDao userDao;
    @Autowired
    public AccountService(UserDao userDao) {
        this.userDao = userDao;
    }
    public User getUserByUsername(String username) {
        return userDao.getUserByUsername(username);
    }
    public ArrayList<User> getAllUsers(String role) {
        return userDao.getAllUsers(role);
    }
}
