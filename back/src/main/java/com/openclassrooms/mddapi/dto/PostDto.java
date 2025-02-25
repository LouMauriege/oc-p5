package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class PostDto {
    private Long id;
    private Long userId;
    private String title;
    private String topicName;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
