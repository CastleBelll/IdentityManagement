package com.example.TestProject.controller;


import com.example.TestProject.dto.SystemAdminDto;
import com.example.TestProject.service.SystemAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SystemAdminController {

    private final SystemAdminService systemAdminService;

    @GetMapping("/system/admin/save")
    public Long saveAdmin(@RequestParam("systemId") String systemId, @RequestParam("userId") String userId){
        System.out.println(systemId + " " + userId);
        return systemAdminService.save(systemId, userId);
    }
}
