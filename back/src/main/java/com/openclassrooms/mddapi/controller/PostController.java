package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.CreatePostRequest;
import com.openclassrooms.mddapi.model.UpdateUserRequest;
import com.openclassrooms.mddapi.security.UserPrincipal;
import com.openclassrooms.mddapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("post")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<PostDto[]> getPosts(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(postService.getArticleByUserSubscriptions(userPrincipal.getUserId()));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @PostMapping()
    public ResponseEntity<String> createPost(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody CreatePostRequest createPostRequest) {
        postService.createPost(userPrincipal.getUserId(), createPostRequest);
        return ResponseEntity.ok("Post created !");
    }
}
