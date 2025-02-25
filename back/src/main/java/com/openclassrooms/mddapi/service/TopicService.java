package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.exception.TopicNotFound;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    TopicMapper topicMapper;

    public TopicDto[] getTopics() {
        List<Topic> topics = topicRepository.findAll();
        return topics.stream().map(topicMapper::toDTO).toArray(TopicDto[]::new);
    }

    public TopicDto getTopicById(Long topicId) {
        return topicMapper.toDTO(topicRepository.findById(topicId).orElseThrow(
                () -> new TopicNotFound("Topic non trouvé !")));
    }
}
