package com.openclassrooms.mddapi.exception;

public class TopicNotFound extends RuntimeException {
    public TopicNotFound(String message) {
        super(message);
    }
}
