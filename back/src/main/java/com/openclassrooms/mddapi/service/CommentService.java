package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.exception.UserNotFound;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.CreateCommentRequest;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public CommentDto[] getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream().map(commentMapper::toDto).toArray(CommentDto[]::new);
    }

    public void createComment(Long userId, Long postId, CreateCommentRequest createCommentRequest) {
        User userFind = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !"));
        Post postFind = postRepository.findById(postId).orElseThrow(
                () -> new UserNotFound("Post non trouvé !"));
        Comment comment = Comment.builder()
                .user(userFind)
                .post(postFind)
                .content(createCommentRequest.getContent())
                .build();
        Comment savedComment = commentRepository.save(comment);
        System.out.print(savedComment);
    }

}
