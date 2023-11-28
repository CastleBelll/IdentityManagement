package com.example.TestProject.auth.repository;

import com.example.TestProject.auth.entity.Auth;
import com.example.TestProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Long> {
    @Query("select auth from Auth auth where auth.refreshToken = :refreshToken")
    Optional<Auth> findByRefreshToken(String refreshToken);

    boolean existsByUser(User user);
}
