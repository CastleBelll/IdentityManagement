package com.example.TestProject.service;

import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.repository.SystemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SystemDBService {
    private final SystemRepository systemRepository;

    @Transactional
    public int save(SystemDto requestDto) {
        requestDto.setCreateBy("manager");
        requestDto.setSyncYn("N");
        requestDto.setCreateDt(LocalDateTime.now().toString());
        requestDto.setSyncDt(LocalDateTime.now().toString());
        return systemRepository.save(requestDto.toEntity()).getSystemNum();
    }

    @Transactional(readOnly = true)
    public List<SystemDto> findAllDesc() {
        return systemRepository.findAll().stream()
                .map(SystemDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public SystemDB getSystemById(String systemId) {
        return systemRepository.findBySystemId(systemId).orElse(null);
    }

    @Transactional
    public SystemDB updateSystemDB(String systemId, SystemDB updateSystem) {
        SystemDB systemDB = systemRepository.findBySystemId(systemId).orElse(null);

        if (systemDB != null) {
            systemDB.setSystemGroup(updateSystem.getSystemGroup());
            systemDB.setSystemName(updateSystem.getSystemName());
            systemDB.setSystemDesc(updateSystem.getSystemDesc());
            systemDB.setIpAddr(updateSystem.getIpAddr());
        }
        return systemRepository.save(systemDB);
    }
}
