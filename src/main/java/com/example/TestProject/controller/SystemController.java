package com.example.TestProject.controller;

import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.service.SystemDBService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3000)
public class SystemController {
    private final SystemDBService systemDBService;


    @PutMapping("/system/update")
    public int update(@RequestBody SystemDto requestDto){
        return 0;
    }
    @DeleteMapping("/system/delete")
    public int delete(@RequestBody SystemDto requestDto){
        return 0;
    }

    @PostMapping("/system/save")
    public int save(@RequestBody SystemDto requestDto) {
        return systemDBService.save(requestDto);
    }

    @GetMapping("/system/select")
    public List<SystemDto> findAll() {
        return systemDBService.findAllDesc();
    }


}
