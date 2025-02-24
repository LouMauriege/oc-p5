package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.security.UserPrincipal;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/public")
    public String publicEndPoint(@AuthenticationPrincipal UserPrincipal principal) {
        return "This is public as " + principal.getEmail() + " User id " + principal.getUserId();
    }

    @GetMapping("/user")
    public String userEndPoint() {
        return "This is user";
    }

    @GetMapping("/admin")
    public String adminEndPoint() {
        return "This is admin";
    }

    @GetMapping("/test/logged")
    public String testGetEndpoint(@AuthenticationPrincipal UserPrincipal principal) {
        return "This is public as " + principal.getEmail() + " User id " + principal.getUserId();
//        return ResponseEntity.ok("\"message\": \"Get success\"");
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> testPostEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from post backend!");
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response);
    }

    @GetMapping("/api/test/test")
    public ResponseEntity<Map<String, String>> testGetEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from get backend!");
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response);
    }

}
