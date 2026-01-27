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

	 public AuthService(UserRepository userRepository,
	                       PasswordEncoder passwordEncoder) {
	        this.userRepository = userRepository;
	        this.passwordEncoder = passwordEncoder;
	}

    // Register new user
	 public UserResponseDTO register(String name, String email,
             String username, String password) {
			
			if (userRepository.findByEmail(email).isPresent()) {
				throw new ConflictException("Email already registered");
			}
			
			if (userRepository.findByUsername(username) != null) {
				throw new ConflictException("Username already taken");
			}
			
			String encodedPassword = passwordEncoder.encode(password);
			
			User user = new User(name, email, username, encodedPassword);
			User savedUser = userRepository.save(user);
			
			return mapToDTO(savedUser);
	 }


    // Login user
    public UserResponseDTO login(String email, String password) {
        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

      
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
