package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostMapper postMapper;

    public PostDto[] getPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(postMapper::toDTO).toArray(PostDto[]::new);
    }

    public PostDto[] getArticleByUserSubscriptions(Long userId) {
        List<Post> posts = postRepository.findArticlesByUserSubscriptions(userId);
        return posts.stream().map(postMapper::toDTO).toArray(PostDto[]::new);
    }
}
