package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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

    @GetMapping("/test")
    public String testGetEndpoint(@AuthenticationPrincipal UserPrincipal principal) {
        return "This is public as " + principal.getEmail() + " User id " + principal.getUserId();
//        return ResponseEntity.ok("\"message\": \"Get success\"");
    }

    @PostMapping("/test")
    public ResponseEntity<String> testPostEndpoint() {
        return ResponseEntity.ok("\"message\": \"Post success\"");
    }
}
