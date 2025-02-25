package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.security.UserPrincipal;
import com.openclassrooms.mddapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("post")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<PostDto[]> getPosts(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(postService.getArticleByUserSubscriptions(userPrincipal.getUserId()));
    }

//    @GetMapping("/{user}")
//    public ResponseEntity<PostDto[]> getPostBySubscriptions(@PathVariable Long userId) {
//        return ResponseEntity.ok(postService.getArticleByUserSubscriptions(userId));
//    }
}
