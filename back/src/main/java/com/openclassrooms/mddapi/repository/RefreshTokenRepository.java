package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.RefreshTokenEntity;
import com.openclassrooms.mddapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
    Optional<RefreshTokenEntity> findByToken(String token);
//    void deleteByUser(User user);
}
