package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.config.TokenConfig;
import com.openclassrooms.mddapi.model.*;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.JwtUtils;
import com.openclassrooms.mddapi.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private TokenConfig tokenConfig;

    @Autowired
    private JwtUtils jwtUtils;

    private final AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        String accessToken = jwtUtils.jwtIssuer(userPrincipal.getUserId(), userPrincipal.getEmail(), Collections.emptyList());

        return LoginResponse.builder()
                .jwt(accessToken)
                .build();
    }

    public Long getUserLoggedId(String userEmail, UpdateUserRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userEmail, request.getPassword())
        );

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return userPrincipal.getUserId();
    }

    public ResponseEntity<LoginResponse> register(RegisterRequest request) {
        if (userService.isEmailAvailable(request.getEmail())) {
            LoginRequest loginRequest = LoginRequest.builder()
                    .email(request.getEmail())
                    .password(request.getPassword())
                    .build();
            userService.createUser(request);
            return ResponseEntity.ok(login(loginRequest));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
