package com.openclassrooms.mddapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/public")
    public String publicEndPoint() {
        return "This is public";
    }

    @GetMapping("/user")
    public String userEndPoint() {
        return "This is user";
    }

    @GetMapping("/admin")
    public String adminEndPoint() {
        return "This is admin";
    }

    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoint() {
        return ResponseEntity.ok("\"message\": \"Get success\"");
    }

    @PostMapping("/test")
    public ResponseEntity<String> testPostEndpoint() {
        return ResponseEntity.ok("\"message\": \"Post success\"");
    }
}
