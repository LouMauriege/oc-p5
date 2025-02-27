package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.exception.PostNotFound;
import com.openclassrooms.mddapi.exception.TopicNotFound;
import com.openclassrooms.mddapi.exception.UserNotFound;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.CreatePostRequest;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostMapper postMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TopicRepository topicRepository;

    public PostDto[] getPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(postMapper::toDTO).toArray(PostDto[]::new);
    }

    public PostDto[] getArticleByUserSubscriptions(Long userId) {
        List<Post> posts = postRepository.findArticlesByUserSubscriptions(userId);
        return posts.stream().map(postMapper::toDTO).toArray(PostDto[]::new);
    }

    public PostDto getPostById(Long postId) {
        return postMapper.toDTO(postRepository.findById(postId).orElseThrow(
                () -> new PostNotFound("Post non trouvé !")));
    }

    public void createPost(Long userId, CreatePostRequest createPostRequest) {
        User userFind = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("Utilisateur non trouvé !"));
        Topic topicFind = topicRepository.findByName(createPostRequest.getTopicName()).orElseThrow(
                () -> new TopicNotFound("Topic non trouvé !"));
        Post post = Post.builder()
                .user(userFind)
                .title(createPostRequest.getTitle())
                .topic(topicFind)
                .content(createPostRequest.getContent())
                .build();
        Post savedPost = postRepository.save(post);
        System.out.print(savedPost);
    }
}
