package com.openclassrooms.mddapi.exception;

public class PostNotFound extends RuntimeException {
    public PostNotFound(String message) {
        super(message);
    }
}
