package com.example.TestProject.dto;

import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SystemDetailDto {
    private SystemDB systemDB;
    private SystemKeyword systemKeyword;

    public SystemDetailDto() {
    }
    public SystemDetailDto(SystemDB systemDB, SystemKeyword systemKeyword){
        this.systemDB = systemDB;
        this.systemKeyword = systemKeyword;
    }
}
