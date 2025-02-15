package com.openclassrooms.mddapi.model;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;
}
