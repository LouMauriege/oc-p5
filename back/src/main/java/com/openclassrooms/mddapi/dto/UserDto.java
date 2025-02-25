package com.openclassrooms.mddapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String name;
    private String email;

    @JsonIgnore
    private String password;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
