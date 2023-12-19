package com.example.TestProject.service;

import com.example.TestProject.common.Common;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.dto.SystemKeywordDto;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import com.example.TestProject.entity.User;
import com.example.TestProject.repository.SystemKeywordRepository;
import com.example.TestProject.repository.SystemRepository;
import com.example.TestProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SystemDBService {
    private final SystemRepository systemRepository;
    private final SystemKeywordRepository systemKeywordRepository;
    Common common = new Common();
    private final UserRepository userRepository;
    @Transactional
    public void save(SystemDB systemDB, SystemKeyword systemKeyword) {
        systemDB.setCreateBy("manager");
        systemDB.setSyncYn("N");
        systemDB.setCreateDt(common.DateToString(LocalDateTime.now()));
        systemDB.setSyncDt(common.DateToString(LocalDateTime.now()));

        SystemDB saveSystemDB = systemRepository.save(systemDB);

        systemKeyword.setSystemDB(saveSystemDB);
        systemKeywordRepository.save(systemKeyword);
    }

    @Transactional(readOnly = true)
    public List<SystemDto> findAllDesc(String userId) {
        return systemRepository.findAll(userId).stream()
                .map(SystemDto::new)
                .collect(Collectors.toList());
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
    public List<SystemDto> getSelectedSystemList(List<String> systemdIds) {
        ArrayList<SystemDto> systemDBList = new ArrayList<SystemDto>();
        for (String systemId:systemdIds) {
            SystemDB systemDB = systemRepository.findBySystemId(systemId).get();
            SystemDto systemDto = new SystemDto(systemDB);
            systemDBList.add(systemDto);
        }
        return (List)systemDBList;
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
