package com.divami.cadence.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

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
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	    http
	        .cors(Customizer.withDefaults())
	        .csrf(customizer -> customizer.disable())
	        .authorizeHttpRequests(request -> request
	            // Public endpoints - no authentication needed
	            .antMatchers("/api/auth/register").permitAll()
	            .antMatchers("/api/auth/login").permitAll()
	            .antMatchers(HttpMethod.GET, "/api/products").permitAll()
	            .antMatchers(HttpMethod.GET, "/api/products/**").permitAll()
	            .antMatchers(HttpMethod.GET, "/api/product/**").permitAll()
	            //
	            // ADMIN only (create/update/delete products)
	            .antMatchers(HttpMethod.POST, "/api/product").hasRole("ADMIN")
	            .antMatchers(HttpMethod.POST, "/api/product/**").hasRole("ADMIN")
	            .antMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
	            .antMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
	            //
	            // All other API endpoints require authentication
	            .anyRequest().authenticated()
	        )
	        .formLogin(Customizer.withDefaults())
	        .httpBasic(Customizer.withDefaults())
	        .sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

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
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
		
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
