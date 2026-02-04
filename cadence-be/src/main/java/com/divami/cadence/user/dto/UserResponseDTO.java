package com.divami.cadence.user.dto;

import com.divami.cadence.user.enums.Role;

import java.time.Instant;
import java.util.UUID;

public class UserResponseDTO {
    private UUID id;
    private String name;
    private String email;
    private String username;
    private Role role;
    private Instant createdAt;

    public UserResponseDTO(UUID id, String name, String email,
                           String username, Role role, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.role = role;
        this.createdAt = createdAt;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getUsername() { return username; }
    public Role getRole() { return role; }
    public Instant getCreatedAt() { return createdAt; }
}
