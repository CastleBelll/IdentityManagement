package com.example.TestProject.controller;

import com.example.TestProject.common.EncodePassword;
import com.example.TestProject.dto.SystemDetailDto;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.dto.SystemKeywordDto;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import com.example.TestProject.repository.SystemKeywordRepository;
import com.example.TestProject.service.SystemDBService;
import com.example.TestProject.service.SystemKeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3000)
public class SystemController {
    private final SystemDBService systemDBService;
    private final SystemKeywordService systemKeywordService;

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
    public List<SystemDto> findAll() {
        return systemDBService.findAllDesc();
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
