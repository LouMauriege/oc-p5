USE mdd;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE topics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

CREATE TABLE subscriptions (
    user_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, topic_id),  -- Ensures unique subscriptions
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX `users_index` ON `users` (`email`);




INSERT INTO users (name, email, password) VALUES
    ('Stewe1', 'stewe1@griffin.fox', '$2a$12$RTLVMmcLk/n9y712QIVOYOod4olXuS3p.MVGcnuSbEHkRVhMJeDHe'),
    ('Stewe2', 'stewe2@griffin.fox', '$2a$12$RTLVMmcLk/n9y712QIVOYOod4olXuS3p.MVGcnuSbEHkRVhMJeDHe');

INSERT INTO topics (name, description) VALUES
    ('Javascript', 'Discussions et méthodologies avec javascript.'),
    ('Yaml', 'Pourquoi le Yaml est-il bien meilleur que le .properties'),
    ('Java', 'Le java sous tous ses angles !');

INSERT INTO subscriptions (user_id, topic_id) VALUES
    (1, 2),
    (1, 3);

INSERT INTO posts (user_id, topic_id, title, content) VALUES
        (2, 2, 'Article sur le Yaml', 'Voici pourquoi je ne suis pas pratiquant des .properties');

INSERT INTO posts (user_id, topic_id, title, content, created_at, updated_at) VALUES
        (2, 1, 'Article sur le js', 'Mon super contenu pour un article JS',
            '2023-06-15 14:23:00', '2023-06-20 10:45:00'),
        (2, 2, 'Encore le Yaml', 'Encore et toujours du YAML pour remplacer les fichiers properties',
            '2022-12-05 17:15:00', '2023-01-08 08:50:00'),
        (2, 3, 'Du java ??', 'Pourquoi le logo est-il une tasse ?',
            '2023-08-21 12:00:00', '2023-09-05 16:30:00');

INSERT INTO comments (post_id, user_id, content) VALUES
        (1, 1, 'Trop nul.'),
        (1, 2, 'Encore un com bien constructif...');