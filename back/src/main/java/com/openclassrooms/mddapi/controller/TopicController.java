package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.security.UserPrincipal;
import com.openclassrooms.mddapi.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("topic")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public ResponseEntity<TopicDto[]> getTopics() {
        return ResponseEntity.ok(topicService.getTopics());
    }

    @GetMapping("/subscribe/{topicId}")
    public ResponseEntity<?> subscribeUserToTopic(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long topicId) {
        topicService.subscribeUserToTopic(userPrincipal, topicId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/unsubscribe/{topicId}")
    public ResponseEntity<?> unsubscribeUserToTopic(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long topicId) {
        topicService.unsubscribeUserToTopic(userPrincipal, topicId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
