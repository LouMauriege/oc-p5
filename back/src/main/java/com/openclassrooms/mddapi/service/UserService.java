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

//    private static final String EXISTING_EMAIL= "test@test.t";

//    public Optional<User> getUseroByEmail(String email) {
//        // TODO: Move this to my db
//
//        if(! EXISTING_EMAIL.equalsIgnoreCase(email)) return Optional.empty();
//
//        var user = new User();
//        user.setId(1L);
//        user.setEmail(EXISTING_EMAIL);
//        user.setPassword("$2a$12$Z7URqD7XztauZveVLGLyCOfTACwFhW9RbtbKOzjW7U6Ux01fa9.0y");
//        user.setName("jean jacques");
//        return Optional.of(user);
//    }

    public UserDto getUserByEmail(String email) {
        return userMapper.toDTO(userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !")));
    }

    public User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
            () -> new UserNotFound("Utilisateur non trouvé !"));
    }
}
