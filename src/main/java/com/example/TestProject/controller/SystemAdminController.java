package com.example.TestProject.controller;


import com.example.TestProject.dto.SystemAdminDto;
import com.example.TestProject.service.SystemAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3000)
public class SystemAdminController {

    private final SystemAdminService systemAdminService;

    @PostMapping("/system/admin/save")
    public Long saveAdmin(@RequestBody SystemAdminDto requestDto){
        return systemAdminService.save(requestDto);
    }
}
