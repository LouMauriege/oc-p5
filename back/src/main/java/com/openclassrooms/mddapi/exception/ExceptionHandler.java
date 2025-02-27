package com.openclassrooms.mddapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler({UserNotFound.class})
    public ResponseEntity<Object> userNotFound(UserNotFound userNotFound) {
        return new ResponseEntity<>("Utilisateur non trouvé !", HttpStatus.NOT_FOUND);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({TopicNotFound.class})
    public ResponseEntity<Object> topicNotFound(TopicNotFound topicNotFound) {
        return new ResponseEntity<>("Topic non trouvé !", HttpStatus.NOT_FOUND);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({PostNotFound.class})
    public ResponseEntity<Object> postTopicNotFound(PostNotFound postNotFound) {
        return new ResponseEntity<>("Post non trouvé !", HttpStatus.NOT_FOUND);
    }
}
