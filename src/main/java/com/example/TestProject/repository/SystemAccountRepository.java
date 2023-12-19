package com.example.TestProject.repository;

import com.example.TestProject.dto.SystemAccountDto;
import com.example.TestProject.entity.SystemAccount;
import com.example.TestProject.entity.SystemKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SystemAccountRepository extends JpaRepository<SystemAccount, Long> {

    @Query("SELECT s.systemUserId FROM SystemAccount s WHERE s.systemDB.systemId = :systemId")
    List<String> findBySystemId(@Param("systemId") String systemId);

    @Query("SELECT s FROM SystemAccount s WHERE s.systemDB.systemId = :systemId")
    List<SystemAccount> findAccountsBySystemId(@Param("systemId") String systemId);

    @Query("SELECT count(*) FROM SystemAccount s WHERE s.systemDB.systemId = :systemId")
    int findBySystemIdCount(@Param("systemId") String systemId);

    @Query("SELECT s.systemUserPasswd FROM SystemAccount s WHERE s.systemDB.systemId = :systemId and s.systemUserId = :systemUserId")
    String getPassword(@Param("systemId") String systemId, @Param("systemUserId") String systemUserId);
}
