package com.introduce2se.seproject.api;

import com.introduce2se.seproject.account.AccountService;
import com.introduce2se.seproject.account.model.User;
import com.introduce2se.seproject.security.SecurityService;
import com.introduce2se.seproject.security.dto.BasicLoginDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/api/security")
public class SecurityController {
    private final SecurityService securityService;
    private final AccountService accountService;
    @Autowired
    public SecurityController(SecurityService securityService, AccountService accountService)
    {
        this.securityService = securityService;
        this.accountService = accountService;
    }
    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> login(HttpServletRequest request, @RequestBody BasicLoginDto loginDto)
    {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();
        int userId = securityService.login(request,username,password);
        if(userId != -1)
        {
            User user = accountService.getUserById(userId);
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.ok(null);
        }
    }
}
