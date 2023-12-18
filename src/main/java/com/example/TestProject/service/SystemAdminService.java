package com.example.TestProject.service;

import com.example.TestProject.dto.SystemAdminDto;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.entity.SystemAdmin;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.User;
import com.example.TestProject.repository.SystemAdminRepository;
import com.example.TestProject.repository.SystemRepository;
import com.example.TestProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class SystemAdminService {
    private final SystemAdminRepository systemAdminRepository;
    private final SystemRepository systemRepository;

    private final UserRepository userRepository;
    @Transactional
    public Long save(String systemId, String userId) {
        SystemDB systemDB = systemRepository.findBySystemId(systemId).get();
        User user = userRepository.findByUserId(userId).get();
        SystemAdmin systemAdmin = SystemAdmin.builder()
                .systemDb(systemDB)
                .user(user)
                .createDt(LocalDateTime.now().toString())
                .updateDt(LocalDateTime.now().toString())
                .build();

        return systemAdminRepository.save(systemAdmin).getSystemAdminNum();
    }

}
