package com.divami.cadence.auth;

import com.divami.cadence.common.response.ApiResponse;
import com.divami.cadence.auth.dto.LoginRequestDTO;
import com.divami.cadence.auth.dto.RegisterRequestDTO;
import com.divami.cadence.user.dto.UserResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import javax.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> register(
            @RequestBody RegisterRequestDTO request) {

        UserResponseDTO user = authService.register(
                request.getName(),
                request.getEmail(),
                request.getUsername(),
                request.getPassword()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        HttpStatus.CREATED,
                        "User registered successfully",
                        user
                ));
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponseDTO>> login(
            @RequestBody LoginRequestDTO request) {

        UserResponseDTO user = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK,
                        "Login successful",
                        user
                )
        );
    }
    
    
    @GetMapping("/csrf-token")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute("_csrf");
    }

    
    
}
