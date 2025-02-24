package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.config.TokenConfig;
import com.openclassrooms.mddapi.model.LoginRequest;
import com.openclassrooms.mddapi.model.LoginResponse;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.security.JwtUtils;
import com.openclassrooms.mddapi.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        System.out.println(userPrincipal);

        String accessToken = jwtUtils.jwtIssuer(userPrincipal.getUserId(), userPrincipal.getEmail(), Collections.emptyList());

        return LoginResponse.builder()
                .jwt(accessToken)
                .build();
    }

}
