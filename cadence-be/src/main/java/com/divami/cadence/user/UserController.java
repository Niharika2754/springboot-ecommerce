package com.divami.cadence.user;

import com.divami.cadence.common.response.ApiResponse;
import com.divami.cadence.user.dto.UserResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public ResponseEntity<ApiResponse<java.util.List<UserResponseDTO>>> getAllUsers() {
        java.util.List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(
                ApiResponse.success(HttpStatus.OK, "Users fetched successfully", users)
        );
    }

    // REMOVED: POST /api/users endpoint
    // Users should register via POST /api/auth/register instead
    // This ensures proper password hashing and validation
    
    // @PostMapping
    // public ResponseEntity<ApiResponse<UserResponseDTO>> createUser(
    //         @RequestBody User user) {
    //     UserResponseDTO created = userService.createUser(
    //             user.getName(),
    //             user.getEmail(),
    //             user.getUsername(),
    //             user.getPassword()
    //     );
    //     return ResponseEntity
    //             .status(HttpStatus.CREATED)
    //             .body(ApiResponse.success(
    //                     HttpStatus.CREATED,
    //                     "User created successfully",
    //                     created
    //             ));
    // }


    // Get user by id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUser(@PathVariable UUID id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(
                ApiResponse.success(HttpStatus.OK, "User fetched successfully", user)
        );
    }

    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable UUID id,
            @RequestBody User user) {

        User updated = userService.updateUser(
                id,
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(
                ApiResponse.success(HttpStatus.OK, "User updated successfully", updated)
        );
    }

    // Soft delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.success(HttpStatus.NO_CONTENT, "User deleted successfully", null));
    }
}
