package com.divami.cadence.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.divami.cadence.user.dto.UserResponseDTO;
import com.divami.cadence.user.enums.Role;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Added for password hashing

    // Updated constructor to inject PasswordEncoder
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
			this.userRepository = userRepository;
			this.passwordEncoder = passwordEncoder;
	}


    // Create and save new user (for internal/admin use only)
    // IMPORTANT: Public users should register via /api/auth/register endpoint
    public UserResponseDTO createUser(String name, String email, String username, String password) {
        // Hash password before storing - NEVER store plain text passwords!
        String hashedPassword = passwordEncoder.encode(password);
        
        User user = new User(
                name,
                email,
                username,
                hashedPassword,
                Role.USER
        );
        User savedUser = userRepository.save(user); // Persist entity

        return mapToDTO(savedUser); // Convert entity → DTO
    }
    
    // Reusable mapper method
    private UserResponseDTO mapToDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                user.getCreatedAt()
        );
    }

    // Get all users
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(java.util.stream.Collectors.toList());
    }

    // Fetch user by ID or throw error
    public User getUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    // Update user fields
    public User updateUser(UUID id, String name, String email) {
        User user = getUser(id);
        user.setName(name);
        user.setEmail(email);
        return user; // No save needed due to @Transactional
    }

    // Soft delete user
    public void deleteUser(UUID id) {
        User user = getUser(id);
        userRepository.delete(user); // Triggers @SQLDelete
    }
}
