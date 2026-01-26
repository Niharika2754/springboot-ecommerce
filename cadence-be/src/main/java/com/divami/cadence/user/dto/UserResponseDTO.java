package com.divami.cadence.user.dto;

import java.time.Instant;
import java.util.UUID;

public class UserResponseDTO {
    private UUID id;          // Expose ID safely
    private String name;      // Name is safe for client
    private String email;     // Email is safe for client
    private String username;  // Username is safe for client
    private Instant createdAt;// Useful metadata for client
    
    // Constructor used to build DTO from entity
    public UserResponseDTO(UUID id, String name, String email,
                           String username, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.createdAt = createdAt;
    }
    
 // Getters only (DTO should be immutable)
    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getUsername() { return username; }
    public Instant getCreatedAt() { return createdAt; }
}
