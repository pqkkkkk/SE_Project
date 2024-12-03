package com.introduce2se.seproject.api;

import com.introduce2se.seproject.security.SecurityService;
import com.introduce2se.seproject.security.dto.LoginDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/security")
public class SecurityController {
    private final SecurityService securityService;
    @Autowired
    SecurityController(SecurityService securityService)
    {
        this.securityService = securityService;
    }
    @GetMapping("/login")
    public ResponseEntity<String> login(HttpServletRequest request, @RequestBody LoginDto loginDto)
    {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();
        if(securityService.login(request,username,password))
        {
            return ResponseEntity.ok("Login successful");
        }
        else{
            return ResponseEntity.ok("Login failed");
        }
    }
}
