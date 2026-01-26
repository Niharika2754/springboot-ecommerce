package com.divami.cadence.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Password encoder for authentication
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF because we are using APIs (not browser forms)
            .csrf().disable()

            // Enable CORS using CorsConfigurationSource bean
            .cors()
            .and()

            // Authorization rules
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/api/products/**", "/api/product/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/products/**", "/api/product/**").permitAll()
            .antMatchers(HttpMethod.PUT, "/api/products/**", "/api/product/**").permitAll()
            .antMatchers(HttpMethod.DELETE, "/api/products/**", "/api/product/**").permitAll()
            .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
            .antMatchers("/api/auth/**").permitAll()
            .anyRequest().permitAll();

        return http.build();
    }
}
