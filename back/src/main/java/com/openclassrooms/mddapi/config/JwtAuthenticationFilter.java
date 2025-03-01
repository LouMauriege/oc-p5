package com.openclassrooms.mddapi.config;

import com.openclassrooms.mddapi.security.JwtUtils;
import com.openclassrooms.mddapi.security.UserPrincipalAuthenticationToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().matches("^(/login|/register).*");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        extractTokenFromRequest(request)
//                .map(jwtUtils::jwtDecoder)
//                .map(jwtUtils::jwtToPrincipal)
//                .map(UserPrincipalAuthenticationToken::new)
//                .ifPresent(authentication ->
//                        SecurityContextHolder.getContext().setAuthentication(authentication));
//
//        filterChain.doFilter(request, response);
        try {
            // Attempt to extract and decode JWT token
            extractTokenFromRequest(request)
                    .map(jwtUtils::jwtDecoder)  // Decode token
                    .map(jwtUtils::jwtToPrincipal)  // Convert token to principal (user)
                    .map(UserPrincipalAuthenticationToken::new)  // Create authentication token
                    .ifPresent(authentication ->
                            SecurityContextHolder.getContext().setAuthentication(authentication)
                    );

            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\": \"Jwt authentication failed\"}");
        }
    }

    private Optional<String> extractTokenFromRequest(HttpServletRequest request) {
        var token = request.getHeader("Authorization");
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return Optional.of(token.substring(7));
        }
        return Optional.empty();
    }
}
