package com.introduce2se.seproject.api;

import com.introduce2se.seproject.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/account")
public class AccountController {
    private final AccountService accountService;
    @Autowired
    AccountController(AccountService accountService)
    {
        this.accountService = accountService;
    }
    @GetMapping("/allDoctors")
    public ResponseEntity<String> getAllDoctors()
    {
        return ResponseEntity.ok(accountService.getAllUsers("doctor").toString());
    }
}
