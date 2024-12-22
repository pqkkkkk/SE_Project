package com.introduce2se.seproject.account;

import com.introduce2se.seproject.account.dao.management.ManagementDao;
import com.introduce2se.seproject.account.dao.user.UserDao;
import com.introduce2se.seproject.account.dto.ManagementDto;
import com.introduce2se.seproject.account.model.Doctor;
import com.introduce2se.seproject.account.model.Patient;
import com.introduce2se.seproject.account.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {

    private final UserDao userDao;
    private final ManagementDao managementDao;
    @Autowired
    public AccountService(UserDao userDao, ManagementDao managementDao) {
        this.userDao = userDao;
        this.managementDao = managementDao;
    }
    public User getUserByUsername(String username) {
        return userDao.getUserByUsername(username);
    }
    public ArrayList<User> getAllUsers(String role) {
        return userDao.getAllUsers(role);
    }
    public User getUserById(int id) {

        return userDao.getUserById(id);
    }
    @Transactional(rollbackFor = Exception.class)
    public boolean createDoctor(Doctor doctor)
    {
        try {
            userDao.createUser((User) doctor);
            int id = userDao.getUserByUsername(doctor.getUserName()).getId();
            doctor.setId(id);
            userDao.addDoctorInformation(doctor);
            return true;
        }
        catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }

    }
    @Transactional(rollbackFor = Exception.class)
    public boolean createPatient(Patient patient)
    {
        try {
            userDao.createUser((User) patient);
            int id = userDao.getUserByUsername(patient.getUserName()).getId();
            patient.setId(id);
            userDao.addPatientInformation(patient);
            return true;
        }
        catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }

    }
    public List<ManagementDto> getConnectingUsers(int currentUserId, String currentRole) {
        return managementDao.getConnectingUsers(currentUserId, currentRole);
    }
    public boolean createFeedback()
    {
        return false;
    }
}
