package com.example.TestProject.auth.config;

import com.example.TestProject.auth.jwt.JwtTokenFilter;
import com.example.TestProject.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;
    private final JwtTokenProvider jwtTokenProvider;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf().disable()
                .cors().and()
                .authorizeRequests()
//                // 관리자 관련 모든 요청에 대해 승인된 사용자 중 ADMIN 권한이 있는 사용자만 허용
//                .antMatchers("/api/v1/admin/**").hasRole("ADMIN")
//                .antMatchers("/api/v2/admin/**").hasRole("ADMIN")
//                // 회원가입 및 로그인 관련 모든 요청에 대해 아무나 승인
                .antMatchers("/system/admin/**").hasRole("USER")
                .antMatchers("/system/**").hasRole("USER")
                .antMatchers( "/system/select/systemList").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/api/v1/user").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/v1/user").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/v1/user").permitAll()

                .antMatchers(HttpMethod.POST, "/api/v1/user").permitAll()
                .antMatchers("/api/v1/auth/**").permitAll()


                .and()
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .permitAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(this.jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


}
