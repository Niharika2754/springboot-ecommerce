package com.divami.cadence.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Password encoder for authentication
     @Bean
     public PasswordEncoder passwordEncoder() {
         return new BCryptPasswordEncoder();
     }
	
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	    http
	        .csrf(customizer -> customizer.disable())
	        .authorizeHttpRequests(request -> request
	            // Public endpoints - no authentication needed
	            .antMatchers("/api/auth/register").permitAll()
	            .antMatchers("/api/auth/login").permitAll()
	            .antMatchers(HttpMethod.GET, "/api/products/**").permitAll()
	            .antMatchers(HttpMethod.GET, "/api/product/**").permitAll()
	            
	            // All other endpoints require authentication
	            .anyRequest().authenticated()
	        )
	        .formLogin(Customizer.withDefaults())
	        .httpBasic(Customizer.withDefaults())
	        .sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        );

	    return http.build();
	}
	
//	@Bean
//	public UserDetailsService userDetailsService() {
//		
//		UserDetails user1 = User.withDefaultPasswordEncoder().
//				username("nikki@88")
//				.password("nikki@88")
//				.roles("USER").build();
//		UserDetails user2 = User.withDefaultPasswordEncoder().
//				username("niha@88")
//				.password("niha@88")
//				.roles("USER").build();
//		return new InMemoryUserDetailsManager(user1,user2);
//	}
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder());
		provider.setUserDetailsService(userDetailsService);
		return provider;
		
	}



}
