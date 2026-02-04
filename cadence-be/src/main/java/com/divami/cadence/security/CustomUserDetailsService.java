
/*
This is WHERE LOGIN ACTUALLY HITS YOUR DATABASE
When a user submits:POST /login
Spring Security internally calls:
loadUserByUsername(String username)
*/
package com.divami.cadence.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.divami.cadence.user.User;
import com.divami.cadence.user.UserRepository;

import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository repo;
	
	
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
       // Try to find by username first, then by email
       User user = repo.findByUsername(username)
               .orElseGet(() -> repo.findByEmail(username)
                       .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username)));
       return new CustomUserDetails(user);
    }
}



/*
Here’s the real flow:

User hits /login
     UsernamePasswordAuthenticationFilter : extracts username & password

AuthenticationManager
     delegates to DaoAuthenticationProvider

DaoAuthenticationProvider
     calls loadUserByUsername(username)
Your CustomUserDetailsService
     fetches user from DB
Returns UserDetails
PasswordEncoder
compares DB password vs entered password

Success → SecurityContext populated
Failure → AuthenticationException
*/