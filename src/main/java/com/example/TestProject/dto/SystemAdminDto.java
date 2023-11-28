package com.example.TestProject.dto;


import com.example.TestProject.entity.SystemAdmin;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SystemAdminDto {

    private Long systemAdminNum;

    private String systemAdminId;

    private String  systemAdminName;

    private String systemAdminPassword;

    private String createDt;

    private String updateDt;

    private String  systemId;

    private String userId;
    @Builder
    public SystemAdminDto(Long systemAdminNum, String systemAdminId, String systemAdminName, String systemAdminPassword,
                          String createDt, String updateDt, String systemId, String userId){
        this.systemAdminNum = systemAdminNum;
        this.systemAdminName = systemAdminName;
        this.systemAdminId = systemAdminId;
        this.systemAdminPassword = systemAdminPassword;
        this.systemId = systemId;
        this.userId = userId;
        this.createDt = createDt;
        this.updateDt = updateDt;
    }
    public SystemAdminDto(SystemAdmin entity){
        this.systemAdminNum = entity.getSystemAdminNum();
        this.systemAdminName = entity.getSystemAdminName();
        this.systemAdminId = entity.getSystemAdminId();
        this.systemAdminPassword = entity.getSystemAdminPassword();
        this.systemId = entity.getSystemDB().getSystemId();
        this.userId = entity.getUser().getUserId();
        this.createDt = entity.getCreateDt();
        this.updateDt = entity.getUpdateDt();
    }
    public SystemAdminDto(){

    }
    public SystemAdmin toEntity(){
        return SystemAdmin.builder()
                .systemAdminId(this.systemAdminId)
                .systemAdminName(this.systemAdminName)
                .systemAdminNum(this.systemAdminNum)
                .systemAdminPassword(this.systemAdminPassword)
                .createDt(this.createDt)
                .updateDt(this.updateDt)
                .build();
    }
}
