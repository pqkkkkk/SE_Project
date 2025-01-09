package com.introduce2se.seproject.api;

import com.introduce2se.seproject.account.AccountService;
import com.introduce2se.seproject.account.dto.ManagementDto;
import com.introduce2se.seproject.account.model.Doctor;
import com.introduce2se.seproject.account.model.Patient;
import com.introduce2se.seproject.account.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/account")
public class AccountController {
    private final AccountService accountService;
    @Autowired
    AccountController(AccountService accountService)
    {
        this.accountService = accountService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public ResponseEntity<ArrayList<User>> GetAllUsers()
    {
        return ResponseEntity.ok().body(accountService.getAllUsers(null));
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/allDoctors")
    public ResponseEntity<ArrayList<User>> GetAllDoctors()
    {
        return ResponseEntity.ok().body(accountService.getAllUsers("doctor"));
    }
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> GetProfile(@PathVariable int id)
    {
        return ResponseEntity.ok().body(accountService.getUserById(id));
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/doctor")
    public ResponseEntity<Integer> CreatDoctor(@RequestBody Doctor doctor)
    {
        if(accountService.createDoctor(doctor))
        {
            return ResponseEntity.ok().body(1);
        }
        else
        {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @PutMapping("/doctor")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> UpdateDoctor(@RequestBody Doctor doctor)
    {
        if(accountService.updateDoctor(doctor))
        {
            return ResponseEntity.ok().body(1);
        }
        else
        {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/patient")
    public ResponseEntity<Integer> CreatPatient(@RequestBody Patient patient)
    {
        if(accountService.createPatient(patient))
        {
            return ResponseEntity.ok().body(1);
        }
        else
        {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @PutMapping("/patient")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> UpdatePatient(@RequestBody Patient patient)
    {
        if(accountService.updatePatient(patient))
        {
            return ResponseEntity.ok().body(1);
        }
        else
        {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @PostMapping("/admin")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> CreatAdmin(@RequestBody User user)
    {
        if(accountService.createAdmin(user))
        {
            return ResponseEntity.ok().body(1);
        }
        else
        {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @PutMapping("/admin")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> UpdateAdmin(@RequestBody User user)
    {
        if(accountService.updateAdmin(user))
        {
            return ResponseEntity.ok().body(1);
        }
        else
        {
            return ResponseEntity.badRequest().body(0);
        }
    }
    @GetMapping("/connectingUsers")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<ManagementDto>> GetConnectingUsers(@RequestParam int currentUserId, @RequestParam String currentRole)
    {
        System.out.println(currentUserId);
        return ResponseEntity.ok().body(accountService.getConnectingUsers(currentUserId, currentRole));
    }

}
