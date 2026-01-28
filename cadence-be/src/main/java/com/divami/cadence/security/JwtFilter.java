package com.divami.cadence.security;

import java.io.IOException;
import org.springframework.context.annotation.Bean;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;


    public JwtFilter(JWTService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Skip JWT validation for public endpoints
        String path = request.getServletPath();
        if (path.startsWith("/api/auth/")) {
            // Allow login/register without JWT validation
            filterChain.doFilter(request, response);
            return;
        }

        // Read Authorization header from request
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // Check if header exists and starts with "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            // Extract token by removing "Bearer "
            token = authHeader.substring(7);

            // Extract username from token
            username = jwtService.extractUsername(token);
        }

        // If username exists and user is not already authenticated
        if (username != null &&
            SecurityContextHolder.getContext().getAuthentication() == null) {

            // Load user details from database
            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            // Validate token against username
            if (jwtService.isTokenValid(token, username)) {

                // Create authentication object
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                // Attach request details (IP, session, etc.)
                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // Set authentication into Spring Security context
                SecurityContextHolder.getContext()
                                     .setAuthentication(authToken);
            }
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
