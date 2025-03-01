package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.exception.UserNotFound;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.*;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.UserPrincipal;
import lombok.Locked;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    @Lazy
    private AuthService authService;

    public UserDto getUserByEmail(String email) {
        return userMapper.toDTO(userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !")));
    }

    public UserDto getUserById(Long id) {
        return userMapper.toDTO(userRepository.findById(id).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !")));
    }

    public User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
            () -> new UserNotFound("Utilisateur non trouvé !"));
    }

    public boolean isEmailAvailable(String email) {
        Optional<User> userFind = userRepository.findByEmail(email);
        return userFind.isEmpty();
    }

    public void createUser(RegisterRequest registerRequest) {
        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .topics(Collections.emptySet())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();
        User createdUser = userRepository.save(user);
        System.out.print("\nuserService.createUser : " + createdUser);
    }

    public ResponseEntity<?> updateUser(Long userId, UpdateUserRequest updateUserRequest) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User non trouvé !"));

        if (!Objects.equals(existingUser.getEmail(), updateUserRequest.getEmail()) && isEmailAvailable(updateUserRequest.getEmail()) ||
                Objects.equals(existingUser.getEmail(), updateUserRequest.getEmail())) {

            Long authenticatedUserId = authService.getUserLoggedId(existingUser.getEmail(), updateUserRequest);

            if (Objects.equals(existingUser.getId(), authenticatedUserId)) {
                existingUser.setName(updateUserRequest.getName());
                existingUser.setEmail(updateUserRequest.getEmail());
                if (!updateUserRequest.getNewPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updateUserRequest.getNewPassword()));
                }
                User updatedUser = userRepository.save(existingUser);
                System.out.print("\nuserService.updateUser : " + updatedUser);
                return ResponseEntity.ok(HttpStatus.OK);
            } else {
                System.out.print("\nuserService.updateUser wrong password : " + updateUserRequest.getPassword());
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Mauvais mot de passe !"));
            }
        }
        return ResponseEntity.badRequest()
                .body(Map.of("message", "Email déjà utilisée.", "status", 400));
    }

    public void addTopicToUserSubscription(String email, Topic topic) {
        User existingUser = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFound("User non trouvé !"));
        Set<Topic> topics = existingUser.getTopics();
        topics.add(topic);
        existingUser.setTopics(topics);
        User updatedUser = userRepository.save(existingUser);
        System.out.print("\nuserService.addTopicToUserSubscription : " + updatedUser);
    }

    public void removeTopicToUserSubscription(String email, Topic topic) {
        User existingUser = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFound("User non trouvé !"));
        Set<Topic> topics = existingUser.getTopics();
        topics.remove(topic);
        existingUser.setTopics(topics);
        User updatedUser = userRepository.save(existingUser);
        System.out.print("\nuserService.removeTopicToUserSubscription : " + updatedUser);
    }
}
