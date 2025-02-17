package com.openclassrooms.mddapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;

    @JsonIgnore
    private String password;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
