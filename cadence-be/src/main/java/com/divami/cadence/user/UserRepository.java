package com.divami.cadence.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email); // Fetch user by email

    Optional<User> findByUsername(String username); // FIX: must return Optional<User>
}
