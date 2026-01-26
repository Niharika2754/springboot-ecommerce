package com.divami.cadence.common.response;

import org.springframework.http.HttpStatus;

// Standard response wrapper for all APIs
public class ApiResponse<T> {

    private boolean success;     // Indicates success or failure
    private int status;          // HTTP status code
    private String message;      // Human readable message
    private T data;              // Actual response payload

    private ApiResponse(boolean success, HttpStatus status, String message, T data) {
        this.success = success;
        this.status = status.value();
        this.message = message;
        this.data = data;
    }

    // Success response builder
    public static <T> ApiResponse<T> success(HttpStatus status, String message, T data) {
        return new ApiResponse<>(true, status, message, data);
    }

    // Error response builder
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return new ApiResponse<>(false, status, message, null);
    }

    public boolean isSuccess() { return success; }
    public int getStatus() { return status; }
    public String getMessage() { return message; }
    public T getData() { return data; }
}
