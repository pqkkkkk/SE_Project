package com.introduce2se.seproject.api;

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
    @Autowired
    public SecurityController(SecurityService securityService)
    {
        this.securityService = securityService;
    }
    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> login(HttpServletRequest request, @RequestBody BasicLoginDto loginDto)
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
