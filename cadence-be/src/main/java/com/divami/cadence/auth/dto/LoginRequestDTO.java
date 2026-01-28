package com.divami.cadence.auth.dto;

public class LoginRequestDTO {
	private String username;
    private String password;

    // Default constructor
    public LoginRequestDTO() {
    }

    // Constructor
    public LoginRequestDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setEmail(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
