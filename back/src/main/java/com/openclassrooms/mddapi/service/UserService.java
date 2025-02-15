package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private static final String EXISTING_EMAIL= "test@test.t";

    public Optional<User> findByEmail(String email) {
        // TODO: Move this to my db
        if(! EXISTING_EMAIL.equalsIgnoreCase(email)) return Optional.empty();

        var user = new User();
        user.setId(1L);
        user.setEmail(EXISTING_EMAIL);
        user.setPassword("$2a$12$Z7URqD7XztauZveVLGLyCOfTACwFhW9RbtbKOzjW7U6Ux01fa9.0y");
        user.setName("jean jacques");
        return Optional.of(user);
    }
}
