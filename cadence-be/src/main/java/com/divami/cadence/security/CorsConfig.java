package com.divami.cadence.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        // Create a CORS configuration object
        CorsConfiguration config = new CorsConfiguration();

        // Allow requests ONLY from this frontend
        // Browser checks this before allowing the response
        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // Allow common HTTP methods
        // OPTIONS is required for preflight requests
        config.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        // Allow headers that frontend usually sends
        // Authorization is needed for JWT
        config.setAllowedHeaders(
                List.of("Authorization", "Content-Type")
        );

        // Allow cookies or authorization headers
        config.setAllowCredentials(true);

        // Register this configuration for all endpoints
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
