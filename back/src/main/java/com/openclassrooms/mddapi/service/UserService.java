package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.exception.UserNotFound;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.RegisterRequest;
import com.openclassrooms.mddapi.model.UpdateUserRequest;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto getUserByEmail(String email) {
        return userMapper.toDTO(userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !")));
    }

    public UserDto getUserById(Long id) {
        return userMapper.toDTO(userRepository.findById(id).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !")));
    }

    public boolean isEmailAvailable(String email) {
        Optional<User> userFind = userRepository.findByEmail(email);
        return userFind.isEmpty();
    }

    public void createUser(RegisterRequest registerRequest) {
        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();
        User createdUser = userRepository.save(user);
        System.out.print(createdUser);
    }

    public void updateUser(Long userId, UpdateUserRequest updateUserRequest) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User non trouvé !")
        );
        existingUser.setName(updateUserRequest.getName());
        existingUser.setEmail(updateUserRequest.getEmail());
        existingUser.setPassword(passwordEncoder.encode(updateUserRequest.getPassword()));
        User updatedUser = userRepository.save(existingUser);
        System.out.print(updatedUser);
    }
}
