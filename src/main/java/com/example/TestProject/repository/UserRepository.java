package com.example.TestProject.repository;

import com.example.TestProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select user from User user where user.userId = :userId")
    Optional<User> findByUserId(@Param("userId") String userId);
    @Query("select user from User user where user.userNum = :userNum")
    Optional<User> findByUserNum(@Param("userNum") Long userNum);
}
