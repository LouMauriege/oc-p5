package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.model.Topic;
import org.springframework.stereotype.Component;

@Component
public class TopicMapper {
    public TopicDto toDTO(Topic topic) {
        return TopicDto.builder()
                .id(topic.getId())
                .name(topic.getName())
                .description(topic.getDescription())
                .build();
    }

    public Topic toEntity(TopicDto topicDto) {
        return Topic.builder()
                .name(topicDto.getName())
                .description(topicDto.getDescription())
                .build();
    }
}
