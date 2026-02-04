package com.divami.cadence.user;

import javax.persistence.*;
import com.divami.cadence.user.enums.Role;


import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;


@Entity
@Table(
    name = "users",
    indexes = {
        @Index(name = "idx_users_email", columnList = "email")
    }
)
@SQLDelete(sql = "UPDATE users SET deleted_at = NOW() WHERE id = ?") // Soft delete instead of physical delete
@Where(clause = "deleted_at IS NULL") // Automatically ignore soft-deleted records
public class User {

    protected User() {} // Required by JPA

    public User(String name, String email, String username, String password, Role role) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }


    @Id
    @GeneratedValue
    @Type(type = "uuid-binary") // Store UUID efficiently as binary
    @Column(name = "id", columnDefinition = "BINARY(16)", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "username", nullable = false, unique = true) // Username should be unique
    private String username;

    @Column(name = "password", nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

	@CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt; // Auto set on insert

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt; // Auto updated on update

    @Column(name = "deleted_at")
    private Instant deletedAt; // Used for soft delete

    // -------- setters (used for updates only) --------

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void markDeleted() {
        this.deletedAt = Instant.now(); // Manual soft delete if needed
    }

    public void restore() {
        this.deletedAt = null; // Restore soft-deleted user
    }

    public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

    // -------- getters --------

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public Instant getDeletedAt() { return deletedAt; }
}
