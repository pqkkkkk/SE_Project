package com.introduce2se.seproject.account.dao.user;

import com.introduce2se.seproject.account.model.Doctor;
import com.introduce2se.seproject.account.model.Patient;
import com.introduce2se.seproject.account.model.User;

import java.util.ArrayList;

public interface UserDao {
    public User getUserByUsername(String username);
    public void createUser(User user);
    public ArrayList<User> getAllUsers(String role);
    public User getUserById(int id);
    public void addDoctorInformation(Doctor doctor);
    public void addPatientInformation(Patient patient);
    public boolean updateUser(User user);
    public boolean updateDoctorInformation(Doctor doctor);
    public boolean updatePatientInformation(Patient patient);
}
