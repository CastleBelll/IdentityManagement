package com.example.TestProject.service;

import com.example.TestProject.common.EncodePassword;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.dto.SystemKeywordDto;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import com.example.TestProject.repository.SystemKeywordRepository;
import com.example.TestProject.repository.SystemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SystemKeywordService {
    private final SystemKeywordRepository systemKeywordRepository;
    EncodePassword en = new EncodePassword();

    @Transactional
    public SystemKeyword getSystemById(String systemId) {
        return systemKeywordRepository.findBySystemId(systemId).orElse(null);
    }

    @Transactional
    public SystemKeyword updateSystemKeyword(String systemId, SystemKeyword updateSystem) {
        SystemKeyword systemKeyword = systemKeywordRepository.findBySystemId(systemId).orElse(null);
        try {
            if (systemKeyword != null) {
                systemKeyword.setLoginId(updateSystem.getLoginId());
                systemKeyword.setLoginPasswd(en.encrypt(updateSystem.getLoginPasswd()));
                systemKeyword.setLoginPort(updateSystem.getLoginPort());
                systemKeyword.setLoginDriverUrl(updateSystem.getLoginDriverUrl());
            }
            return systemKeywordRepository.save(systemKeyword);
        }catch(Exception e) {
            return null;
        }
    }
}
