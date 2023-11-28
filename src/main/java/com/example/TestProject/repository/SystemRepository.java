package com.example.TestProject.repository;

import com.example.TestProject.entity.SystemDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SystemRepository extends JpaRepository<SystemDB, Long> {

    @Query("SELECT s FROM SystemDB s")
    List<SystemDB> findAll();

    @Query("SELECT s FROM SystemDB s WHERE s.systemId = :systemId")
    Optional<SystemDB> findBySystemId(@Param("systemId") String systemId);
}
