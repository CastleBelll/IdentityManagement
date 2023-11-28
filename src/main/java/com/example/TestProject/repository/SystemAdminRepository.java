package com.example.TestProject.repository;

import com.example.TestProject.controller.SystemController;
import com.example.TestProject.entity.SystemAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemAdminRepository extends JpaRepository<SystemAdmin, Long> {
}
