package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.config.TokenConfig;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.model.LoginRequest;
import com.openclassrooms.mddapi.model.LoginResponse;
import com.openclassrooms.mddapi.model.RefreshTokenEntity;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.RefreshTokenRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.JwtUtils;
import com.openclassrooms.mddapi.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

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
    private RefreshTokenRepository refreshTokenRepository;

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        User user = userService.getUserEntityByEmail(request.getEmail());
//        System.out.println(user);

//        List<String> roles = userPrincipal.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .toList();

        String accessToken = jwtUtils.jwtIssuer(userPrincipal.getUserId(), user.getEmail(), roles);

//        String refreshToken = jwtUtils.refreshTokenIssuer(user, roles);
//        saveRefreshToken(user, refreshToken);

        return LoginResponse.builder()
                .jwt(accessToken)
//                .refreshToken(refreshToken)
                .build();
    }

    private void saveRefreshToken(User user, String refreshTokenToSave) {
        RefreshTokenEntity refreshToken = new RefreshTokenEntity();
        refreshToken.setUserId(user);
        refreshToken.setToken(refreshTokenToSave);
        refreshToken.setExpirationDate(Instant.now().plus(tokenConfig.getRefreshTokenExpirationInDays(), ChronoUnit.DAYS));
        refreshTokenRepository.save(refreshToken);
    }
}
