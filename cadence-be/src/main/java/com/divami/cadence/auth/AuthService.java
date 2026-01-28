package com.divami.cadence.auth;

import com.divami.cadence.auth.dto.AuthResponseDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import com.divami.cadence.common.exception.ConflictException;
import com.divami.cadence.security.JWTService;
import com.divami.cadence.user.User;
import com.divami.cadence.user.UserRepository;
import com.divami.cadence.user.dto.UserResponseDTO;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

	 private final UserRepository userRepository;
	 private final PasswordEncoder passwordEncoder;
	 private final AuthenticationManager authMnager;
	 private final JWTService jwtService;

	 public AuthService(UserRepository userRepository,
	                       PasswordEncoder passwordEncoder,
	                       AuthenticationManager authMnager,
	                       JWTService jwtService
	                       ) {
	        this.userRepository = userRepository;
	        this.passwordEncoder = passwordEncoder;
	        this.authMnager = authMnager;
	        this.jwtService=jwtService;
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



	 public AuthResponseDTO login(String username, String password) {

	     try {
	         Authentication authentication =
	                 authMnager.authenticate(
	                         new UsernamePasswordAuthenticationToken(
	                                 username,
	                                 password
	                         )
	                 );

	         // Authentication successful
	         User user = userRepository.findByUsername(username);

	         String token = jwtService.generateToken(username);

	         return new AuthResponseDTO(
	                 token,
	                 mapToDTO(user)
	         );

	     } catch (AuthenticationException ex) {
	         throw new IllegalArgumentException("Invalid username or password");
	     }
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
