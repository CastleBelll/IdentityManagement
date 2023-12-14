package com.example.TestProject.service;

import com.example.TestProject.dto.SystemAccountDto;
import com.example.TestProject.dto.SystemDetailDto;
import com.example.TestProject.entity.SystemAccount;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import com.example.TestProject.repository.SystemAccountRepository;
import com.example.TestProject.repository.SystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service

public class SystemAccountService {
    @Autowired
    private SystemAccountRepository systemAccountRepository;
    @Autowired
    private SystemKeywordService systemKeywordService;
    @Autowired
    private SystemRepository systemRepository;

    @Transactional
    public SystemAccount saveSystemAccount(SystemAccount systemAccount) {
        SystemKeyword systemKeyword = systemKeywordService.getSystemById(systemAccount.getSystemDB().getSystemId());

        System.out.println("systemAccount.getSystemDB().getSystemId() : "+ systemAccount.getSystemDB().getSystemId());

        List<String> list1 = getSystemById(systemAccount.getSystemDB().getSystemId());

        System.out.println(list1);
try {
    if (!list1.contains(systemAccount.getSystemUserId())) {
        if (systemKeyword.getLoginId().equals(systemAccount.getSystemUserId())) {
            systemAccount.setSystemUserPasswdSync("Y");
            systemAccount.setSystemUserPasswd(systemKeyword.getLoginPasswd());
        }
        System.out.println("systemAccount : " + systemAccount);
        systemRepository.updateSyncBySystemId(systemAccount.getSystemDB().getSystemId(),"Y");
        return systemAccountRepository.save(systemAccount);
    } else {
        systemRepository.updateSyncBySystemId(systemAccount.getSystemDB().getSystemId(),"Y");
        return null;
    }
}catch(Exception e){
    e.printStackTrace();
    return null;
}
    }

    @Transactional
    public List<String> getSystemById(String systemId) {
        return systemAccountRepository.findBySystemId(systemId);
    }

    @Transactional
    public int getSystemAccountCountBySystemId(String systemId) {
        return systemAccountRepository.findBySystemIdCount(systemId);
    }

    @Transactional
    public List<SystemAccount> getSystemAccountsBySystemId(String systemId) {
        return systemAccountRepository.findAccountsBySystemId(systemId);
    }
}
