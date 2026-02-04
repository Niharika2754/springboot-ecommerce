// This is the bridge between: your User entity ↔ Spring Security
// Spring Security does NOT understand your User entity
// It only understands UserDetails
// So we create a class that implements UserDetails and wraps around our User entity

package com.divami.cadence.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.divami.cadence.user.User;

public class CustomUserDetails implements UserDetails {

    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    /* getAuthorities() - This method usually comes from: UserDetails interface (Spring Security) tells Spring Security:
    “What permissions does this logged-in user have?" 
    GrantedAuthority is a Spring Security abstraction for permissions.
    Spring Security treats roles as authorities
    But adds special convenience methods for roles */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );
    }


    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
