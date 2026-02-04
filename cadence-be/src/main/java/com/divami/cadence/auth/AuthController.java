package com.divami.cadence.auth;

import com.divami.cadence.common.response.ApiResponse;
import com.divami.cadence.auth.dto.AuthResponseDTO;
import com.divami.cadence.auth.dto.LoginRequestDTO;
import com.divami.cadence.auth.dto.RegisterRequestDTO;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register endpoint - returns token + user (same shape as login)
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> register(
            @RequestBody RegisterRequestDTO request) {

        AuthResponseDTO authResponse = authService.register(
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
                        authResponse
                ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> login(
            @RequestBody LoginRequestDTO request) {

        AuthResponseDTO user = authService.login(
                request.getUsername(),
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
