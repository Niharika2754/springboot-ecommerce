package com.divami.cadence.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.divami.cadence.common.exception.ConflictException;
import com.divami.cadence.user.User;
import com.divami.cadence.user.UserRepository;
import com.divami.cadence.user.dto.UserResponseDTO;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register new user
    public UserResponseDTO register(String name, String email, String username, String password) {
        // Check if email already exists
        Optional<User> existingByEmail = userRepository.findByEmail(email);
        if (existingByEmail.isPresent()) {
            throw new ConflictException("Email already registered");
        }

        // Check if username already exists
        Optional<User> existingByUsername = userRepository.findByUsername(username);
        if (existingByUsername.isPresent()) {
            throw new ConflictException("Username already taken");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(password);

        // Create and save user
        User user = new User(name, email, username, hashedPassword);
        User savedUser = userRepository.save(user);

        return mapToDTO(savedUser);
    }

    // Login user
    public UserResponseDTO login(String email, String password) {
        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return mapToDTO(user);
    }

    // Map entity to DTO
    private UserResponseDTO mapToDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getUsername(),
                user.getCreatedAt()
        );
    }
}
