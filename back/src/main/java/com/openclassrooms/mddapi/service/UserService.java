package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.exception.UserNotFound;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    public UserDto getUserByEmail(String email) {
        return userMapper.toDTO(userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !")));
    }

    public User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
            () -> new UserNotFound("Utilisateur non trouvé !"));
    }
}
