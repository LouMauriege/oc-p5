package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.model.CreateCommentRequest;
import com.openclassrooms.mddapi.security.UserPrincipal;
import com.openclassrooms.mddapi.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{postId}")
    public ResponseEntity<CommentDto[]> getCommentByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @PostMapping("/{postId}")
    public ResponseEntity<?> createComment(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody CreateCommentRequest request,
            @PathVariable Long postId) {
        commentService.createComment(userPrincipal.getUserId(), postId, request);
        return ResponseEntity.ok(Map.of("message", "Comment created !"));
    }
}
