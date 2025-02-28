package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.exception.UserNotFound;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.RegisterRequest;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.UpdateUserRequest;
import com.openclassrooms.mddapi.model.User;
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

import java.util.Collections;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

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

        Long authenticatedUserId = authService.getUserLoggedId(existingUser.getEmail(), updateUserRequest);

        System.out.print("existingUserId : " + existingUser.getId() + " login id : " + authenticatedUserId);
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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
