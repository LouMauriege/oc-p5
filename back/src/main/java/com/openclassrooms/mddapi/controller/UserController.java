package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.security.UserPrincipal;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(userService.getUserById(userPrincipal.getUserId()));
    }
}
