package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userService.getUserByEmail(username);
        return UserPrincipal.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .authorities(Collections.emptyList())
                .password(user.getPassword())
                .build();
    }
}
