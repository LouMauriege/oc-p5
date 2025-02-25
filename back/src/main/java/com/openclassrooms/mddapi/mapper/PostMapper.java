package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.exception.TopicNotFound;
import com.openclassrooms.mddapi.exception.UserNotFound;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PostMapper {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    public PostDto toDTO(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .userId(post.getUser().getId())
                .title(post.getTitle())
                .topicName(post.getTopic().getName())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    public Post toEntity(PostDto postDto) {
        User user = userRepository.findById(postDto.getUserId()).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !"));
        Topic topic = topicRepository.findByName(postDto.getTopicName()).orElseThrow(
                () -> new TopicNotFound("Topic non trouvé !"));
        return Post.builder()
                .user(user)
                .title(postDto.getTitle())
                .topic(topic)
                .content(postDto.getContent())
                .build();
    }
}
