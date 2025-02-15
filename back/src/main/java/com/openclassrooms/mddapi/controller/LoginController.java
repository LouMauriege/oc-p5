package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class LoginController {

//    @Autowired
//    private AuthenticationManager authenticationManager;

//    @PostMapping("/login")
//    public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest) {
////        Authentication authenticationRequest =
////                UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getEmail(), loginRequest.getPassword());
////        Authentication authenticationResponse =
////                authenticationManager.authenticate(authenticationRequest);
////
////        return ResponseEntity.ok(authenticationResponse);
//    }
}
