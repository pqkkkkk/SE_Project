package com.introduce2se.seproject.account.dao.user;

import com.introduce2se.seproject.account.model.Doctor;
import com.introduce2se.seproject.account.model.Patient;
import com.introduce2se.seproject.account.model.User;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class UserMockDao implements UserDao {
    private ArrayList<User> users;
    public UserMockDao()
    {
        /*
        User user1 = new User(1,"pqkiet854","pqkiet854","patient");
        User user2 = new User(1,"johndoe","pqkiet854","doctor");
        User user3 = new User(1,"lionelmessi","pqkiet854","doctor");
        users = new ArrayList<User>();
        users.add(user1);
        users.add(user2);
        users.add(user3);
         */
    }
    @Override
    public User getUserByUsername(String username) {
        for(User user : users)
        {
            if(user.getUserName().equals(username))
            {
                return user;
            }
        }
        return null;

    }
    @Override
    public void createUser(User user){
        users.add(user);
    }
    @Override
    public ArrayList<User> getAllUsers(String role){
        ArrayList<User> usersByRole = new ArrayList<User>();

        if(role.equals("patient"))
        {
            for(User user : users)
            {
                if(user.getUserRole().equals("patient"))
                {
                    Patient patient = new Patient(user,true);
                    usersByRole.add(user);
                }
            }
        }
        else if(role.equals("doctor"))
        {
            for(User user : users)
            {
                if(user.getUserRole().equals("doctor"))
                {
                    Doctor doctor = new Doctor(user,5,100,"General",4.5);
                    usersByRole.add(doctor);
                }
            }
        }

        return usersByRole;
    }
    @Override
    public User getUserById(int id){
        return null;
    }
    @Override
    public void addDoctorInformation(Doctor doctor){

    }
    @Override
    public void addPatientInformation(Patient patient){

    }
}
