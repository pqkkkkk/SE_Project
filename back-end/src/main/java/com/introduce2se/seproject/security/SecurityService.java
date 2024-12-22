package com.introduce2se.seproject.security;

import com.introduce2se.seproject.account.AccountService;
import com.introduce2se.seproject.account.model.Admin;
import com.introduce2se.seproject.account.model.Doctor;
import com.introduce2se.seproject.account.model.Patient;
import com.introduce2se.seproject.account.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    private final AccountService accountService;
    @Autowired
    public SecurityService(AccountService accountService)
    {
        this.accountService = accountService;
    }
    public User getCurrentUser(HttpServletRequest request)
    {
        return (User)request.getSession().getAttribute("currentUser");
    }

    public void setCurrentUser(HttpServletRequest request, User user)
    {
        request.getSession().setAttribute("currentUser",user);
    }

    public int login(HttpServletRequest request, String actualUsername, String actualPassword){
        HttpSession httpSession = request.getSession();

        User user = accountService.getUserByUsername(actualUsername);

        if(user != null && user.getPassWord().equals(actualPassword))
        {
            if(user.getUserRole().equals("doctor"))
            {
                Doctor doctor = new Doctor(user,5,100,"General",4.5);
                setCurrentUser(request,doctor);
            }
            else if(user.getUserRole().equals("patient"))
            {
                Patient patient = new Patient(user,true);
                setCurrentUser(request,patient);
            }
            else{
                Admin admin = new Admin(user);
                setCurrentUser(request,admin);
            }
            return user.getId();
        }
        else{
            return -1;
        }
    }
    public boolean logout(){
        return true;
    }
}
