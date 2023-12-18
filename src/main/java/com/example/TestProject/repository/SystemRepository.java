package com.example.TestProject.repository;

import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SystemRepository extends JpaRepository<SystemDB, Long> {

    @Query("SELECT a FROM SystemDB a JOIN SystemAdmin b ON a.systemId = b.systemDB.systemId WHERE b.user.userId = :userId")
    List<SystemDB> findAll(@Param("userId") String userId);
//    @Query("SELECT s FROM SystemDB s")
//    List<SystemDB> findAll(@Param("userId") String userId);

    @Query("SELECT s FROM SystemDB s WHERE s.systemId = :systemId")
    Optional<SystemDB> findBySystemId(@Param("systemId") String systemId);

    @Modifying
    @Query("UPDATE FROM SystemDB s SET s.syncYn = :syncYn WHERE s.systemId = :systemId")
    void updateSyncBySystemId(@Param("systemId") String systemId, @Param("syncYn") String syncYn);
}
