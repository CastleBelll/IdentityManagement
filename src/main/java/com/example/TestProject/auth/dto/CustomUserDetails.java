package com.example.TestProject.auth.dto;

import com.example.TestProject.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
public class CustomUserDetails implements UserDetails {
    private final User user;

    // Constructor
    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println(user.getRole().name());
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public Long getUserNum() {
        return user.getUserNum();
    }

    public String getName() {
        return user.getUserName();
    }


    @Override
    public String getUsername() {
        return user.getUserId();
    }

    @Override
    public String getPassword() {
        return user.getUserPassword();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
