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
       User user = repo.findByUsername(username);
       if(user == null) {
    	   System.out.println("User Not Found");
    	   throw new UsernameNotFoundException("User Not Found");
       }
       
       return new CustomUserDetails(user);
    }
}
