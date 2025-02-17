package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.LoginRequest;
import com.openclassrooms.mddapi.model.LoginResponse;
import com.openclassrooms.mddapi.repository.RefreshTokenRepository;
import com.openclassrooms.mddapi.security.JwtUtils;
import com.openclassrooms.mddapi.security.UserPrincipal;
import com.openclassrooms.mddapi.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request) {
//        var authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        var principal = (UserPrincipal) authentication.getPrincipal();
//
//        var roles = principal.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .toList();
//
//        var token = jwtUtils.jwtIssuer(principal.getUserId(), principal.getEmail(), roles);
//        return LoginResponse.builder()
//                .jwt(token)
//                .build();
        return authService.login(request);
    }

    @PostMapping("/login-cookie")
    public ResponseEntity<String> login(@RequestBody @Validated LoginRequest request, HttpServletResponse response) {
        LoginResponse responseToken = authService.login(request);
        Cookie httpOnlyCookie = new Cookie("refreshToken", responseToken.getRefreshToken());
        httpOnlyCookie.setHttpOnly(true);
        httpOnlyCookie.setSecure(true);
        httpOnlyCookie.setPath("/");
        httpOnlyCookie.setMaxAge(24 * 60 * 60); // Expire dans 24h
        response.addCookie(httpOnlyCookie);
        Cookie httpOnlyCookie2 = new Cookie("jwt", responseToken.getJwt());
        httpOnlyCookie2.setHttpOnly(true);
        httpOnlyCookie2.setSecure(true);
        httpOnlyCookie2.setPath("/");
        httpOnlyCookie2.setMaxAge(24 * 60 * 60); // Expire dans 24h
        response.addCookie(httpOnlyCookie2);
        return ResponseEntity.ok("httpOnly cookie set successfully !");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        refreshTokenRepository.findByToken(refreshToken).ifPresent(refreshTokenRepository::delete);
        return ResponseEntity.ok("Logged out successfully !");
    }
}
