package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Fetch posts based on user subscriptions
    @Query("SELECT p FROM Post p WHERE p.topic IN " +
            "(SELECT t FROM User u JOIN u.topics t WHERE u.id = :userId)" +
            "ORDER BY p.createdAt DESC")
    List<Post> findArticlesByUserSubscriptions(Long userId);
}
