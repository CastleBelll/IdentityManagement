package com.example.TestProject.repository;

import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SystemKeywordRepository extends JpaRepository<SystemKeyword, Long> {

    @Query("SELECT s FROM SystemKeyword s WHERE s.systemDB.systemId = :systemId")
    Optional<SystemKeyword> findBySystemId(@Param("systemId") String systemId);
}
