package com.example.TestProject.controller;

import com.example.TestProject.common.EncodePassword;
import com.example.TestProject.dto.SystemAccountDto;
import com.example.TestProject.dto.SystemDetailDto;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.dto.SystemKeywordDto;
import com.example.TestProject.entity.SystemAccount;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import com.example.TestProject.repository.SystemKeywordRepository;
import com.example.TestProject.service.SystemAccountService;
import com.example.TestProject.service.SystemDBService;
import com.example.TestProject.service.SystemKeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3000)
public class SystemController {
    private final SystemDBService systemDBService;
    private final SystemKeywordService systemKeywordService;
    private final SystemAccountService systemAccountService;
    EncodePassword en = new EncodePassword();

    @DeleteMapping("/system/delete")
    public int delete(@RequestBody SystemDto requestDto){
        return 0;
    }

    @PostMapping("/system/save")
    public ResponseEntity<String> save(@RequestBody SystemDto requestDto) {
        SystemDB systemDB = new SystemDB();

        systemDB.setSystemId(requestDto.getSystemId());
        systemDB.setSystemName(requestDto.getSystemName());
        systemDB.setSystemDesc(requestDto.getSystemDesc());
        systemDB.setIpAddr(requestDto.getIpAddr());
        systemDB.setSystemCategory(requestDto.getSystemCategory());
        systemDB.setSystemType(requestDto.getSystemType());


        SystemKeyword systemKeyword = new SystemKeyword();

        systemDBService.save(systemDB, systemKeyword);

        return ResponseEntity.ok("Data saved succecss");
    }

    @GetMapping("/system/select")
    public ResponseEntity<List<SystemDto>> findAll() {
        List<SystemDto> systemDto = systemDBService.findAllDesc();
        for(SystemDto systemDB : systemDto){
            String systemId = systemDB.getSystemId();
            int accountCount = systemAccountService.getSystemAccountCountBySystemId(systemId);
            systemDB.setSystem_user_id_count(accountCount);
        }
        return new ResponseEntity<>(systemDto, HttpStatus.OK);
    }

    @GetMapping("/getAccounts")
    public ResponseEntity<List<SystemAccount>> getSystemAccountBySystemId(@RequestParam String systemId) {
        List<SystemAccount> systemAccount = systemAccountService.getSystemAccountsBySystemId(systemId);
        return new ResponseEntity<>(systemAccount, HttpStatus.OK);
    }
    @PostMapping("/system/select/systemList")
    public List<SystemDto> getSystemDetailList(@RequestParam List<String> systemIds){
        try{
            List<SystemDto> list = systemDBService.getSelectedSystemList(systemIds);
            for (SystemDto DTO:list
                 ) {
                System.out.println(DTO);
            }
            return list;
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/system/select/detail")
    public SystemDetailDto getSystemById(@RequestParam String systemId){
        try{
        SystemDB systemDB = systemDBService.getSystemById(systemId);
        SystemKeyword systemKeyword = systemKeywordService.getSystemById(systemId);
        systemKeyword.setLoginPasswd(en.decrypt(systemKeyword.getLoginPasswd()));
        return new SystemDetailDto(systemDB, systemKeyword);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/system/update")
    public ResponseEntity<String> updateSystemDB(@RequestParam String systemId, @RequestBody SystemDetailDto systemDetailDto) {
        try {
            SystemDB updatedSystemDB = systemDBService.updateSystemDB(systemId, systemDetailDto.getSystemDB());
            SystemKeyword updatedSystemKeyword = systemKeywordService.updateSystemKeyword(systemId, systemDetailDto.getSystemKeyword());
            return ResponseEntity.ok("Data updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating data: " + e.getMessage());
        }
    }
}
