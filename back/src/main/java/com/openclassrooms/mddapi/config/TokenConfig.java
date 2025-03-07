package com.openclassrooms.mddapi.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties("jwt")
public class TokenConfig {
    private String secretKey;
    private Long jwtExpirationInMinutes;
}
