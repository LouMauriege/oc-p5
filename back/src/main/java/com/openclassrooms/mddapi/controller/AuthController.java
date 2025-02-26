package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.LoginRequest;
import com.openclassrooms.mddapi.model.LoginResponse;
import com.openclassrooms.mddapi.model.RegisterRequest;
import com.openclassrooms.mddapi.security.JwtUtils;
import com.openclassrooms.mddapi.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody Map<String, String> request) {
        // TODO: Faire la logique du logout
        return ResponseEntity.ok("Logged out successfully !");
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody @Validated RegisterRequest request) {
        System.out.print("Request received in endpoint : " + request);
        return authService.register(request);
    }
}
