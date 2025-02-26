package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.exception.TopicNotFound;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    TopicMapper topicMapper;

    @Autowired
    UserService userService;

    public TopicDto[] getTopics() {
        List<Topic> topics = topicRepository.findAll();
        return topics.stream().map(topicMapper::toDTO).toArray(TopicDto[]::new);
    }

    public TopicDto getTopicById(Long topicId) {
        return topicMapper.toDTO(topicRepository.findById(topicId).orElseThrow(
                () -> new TopicNotFound("Topic non trouvé !")));
    }

    public void subscribeUserToTopic(UserPrincipal userPrincipal, String topicName) {
        String userEmail = userPrincipal.getEmail();
        Topic topicExisting = topicRepository.findByName(topicName).orElseThrow(
                () -> new TopicNotFound("Topic non trouvé !"));
        userService.addTopicToUserSubscription(userEmail, topicExisting);
    }

    public void unsubscribeUserToTopic(UserPrincipal userPrincipal, String topicName) {
        String userEmail = userPrincipal.getEmail();
        Topic topicExisting = topicRepository.findByName(topicName).orElseThrow(
                () -> new TopicNotFound("Topic non trouvé !"));
        userService.removeTopicToUserSubscription(userEmail, topicExisting);
    }
}
