package com.openclassrooms.mddapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoint() {
        return ResponseEntity.ok("\"message\": \"Get success\"");
    }

    @PostMapping("/test")
    public ResponseEntity<String> testPostEndpoint() {
        return ResponseEntity.ok("\"message\": \"Post success\"");
    }
}
