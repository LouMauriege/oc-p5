package com.openclassrooms.mddapi.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.openclassrooms.mddapi.config.JwtConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtUtils {

    private final JwtConfig jwtConfig;

    public String jwtIssuer(Long userId, String email, List<String> roles) {
        return JWT.create()
                .withSubject(String.valueOf(userId))
                .withExpiresAt(Instant.now().plus(Duration.of(jwtConfig.getExpirationInMinutes(), ChronoUnit.MINUTES)))
                .withClaim("email", email)
                .withClaim("roles", roles)
                .sign(Algorithm.HMAC256(jwtConfig.getSecretKey()));
    }

    public DecodedJWT jwtDecoder(String token) {
        return JWT.require(Algorithm.HMAC256(jwtConfig.getSecretKey()))
                .build()
                .verify(token);
    }

    public UserPrincipal jwtToPrincipal(DecodedJWT jwt) {
        return UserPrincipal.builder()
                .userId(Long.valueOf(jwt.getSubject()))
                .email(jwt.getClaim("email").asString())
                .authorities(extractAuthoritiesFromClaim(jwt))
                .build();
    }

    public List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt) {
        var claim = jwt.getClaim("roles");
        if (claim.isNull() || claim.isMissing()) return List.of();
        return claim.asList(SimpleGrantedAuthority.class);
    }
}
