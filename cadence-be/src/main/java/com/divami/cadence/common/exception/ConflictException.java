package com.divami.cadence.common.exception;

// Thrown when duplicate or conflicting data exists
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
