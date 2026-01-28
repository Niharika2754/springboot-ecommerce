package com.divami.cadence.security;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JWTService {

    // Secret key stored as Base64 string so it can be safely stored and reused
    private String secretKey = "";

    // Token expiration time (1 hour in milliseconds)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    // Constructor runs once when Spring creates this bean
    // We generate a secure HMAC key here
    public JWTService() {
        try {
            // Create a key generator for HMAC-SHA256 algorithm
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");

            // Generate a secure secret key
            SecretKey sk = keyGen.generateKey();

            // Convert raw key bytes to Base64 string
            // JJWT 0.9.x requires byte[] while signing
            this.secretKey = Base64.getEncoder()
                                   .encodeToString(sk.getEncoded());

        } catch (Exception e) {
            // Fail fast if key generation fails
            throw new RuntimeException(e);
        }
    }

    // Generates a signed JWT token for a given username
    public String generateToken(String username) {

        // Map to store custom data inside the JWT payload
        Map<String, Object> claims = new HashMap<>();

        // Example claim; can store roles or permissions
        claims.put("role", "USER");

        // Build and sign the JWT token
        return Jwts.builder()

                // Add custom claims to the token payload
                .setClaims(claims)

                // Subject represents the identity of the token owner
                .setSubject(username)

                // Time when the token is created
                .setIssuedAt(new Date(System.currentTimeMillis()))

                // Time when the token should expire
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME)
                )

                // Sign the token using HS256 and secret key bytes
                // This is REQUIRED for JJWT 0.9.x
                .signWith(
                        SignatureAlgorithm.HS256,
                        Base64.getDecoder().decode(secretKey)
                )

                // Convert the JWT builder to a compact String
                .compact();
    }

    // Extracts the username (subject) from the token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Validates token by checking username and expiration
    public boolean isTokenValid(String token, String username) {
        String tokenUsername = extractUsername(token);
        return tokenUsername.equals(username) && !isTokenExpired(token);
    }

    // Checks whether the token has expired
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Parses the JWT and extracts all claims
    // JJWT 0.9.x uses parser(), NOT parserBuilder()
    private Claims extractAllClaims(String token) {
        return Jwts.parser()

                // Set the same secret key used to sign the token
                .setSigningKey(Base64.getDecoder().decode(secretKey))

                // Parse and validate the token
                .parseClaimsJws(token)

                // Extract payload (claims)
                .getBody();
    }
}
