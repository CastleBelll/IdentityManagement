package com.example.TestProject.dto;

import com.example.TestProject.entity.SystemAccount;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
public class SystemAccountDto {
    private Long id;
    private String systemId;
    private String systemUserId;
    private String systemUserPasswd;
    private String c_dt;
    private String serviceUserGroup;
    private String serviceUserPasswdSync;


    public SystemAccountDto(){

    }

    @Builder
    public SystemAccountDto(Long id, String systemId, String systemUserId, String systemUserPasswd, String c_dt, String serviceUserGroup, String serviceUserPasswdSync) {
        this.id = id;
        this.systemId = systemId;
        this.systemUserId = systemUserId;
        this.systemUserPasswd = systemUserPasswd;
        this.c_dt = c_dt;
        this.serviceUserGroup = serviceUserGroup;
        this.serviceUserPasswdSync = serviceUserPasswdSync;
    }

    public SystemAccountDto(SystemAccount entity) {
        this.id = entity.getId();
        this.systemId = entity.getSystemDB().getSystemId();
        this.systemUserId = entity.getSystemUserId();
        this.systemUserPasswd = entity.getSystemUserPasswd();
        this.c_dt = entity.getC_dt();
        this.serviceUserGroup = entity.getServiceUserGroup();
        this.serviceUserPasswdSync = entity.getServiceUserPasswdSync();
    }
}
