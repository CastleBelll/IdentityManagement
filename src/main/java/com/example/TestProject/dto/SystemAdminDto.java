package com.example.TestProject.dto;


import com.example.TestProject.entity.SystemAdmin;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SystemAdminDto {
    private String createDt;

    private String updateDt;

    private String  systemId;

    private String userId;
    @Builder
    public SystemAdminDto(String createDt, String updateDt, String systemId, String userId){

        this.systemId = systemId;
        this.userId = userId;
        this.createDt = createDt;
        this.updateDt = updateDt;
    }
    public SystemAdminDto(SystemAdmin entity){
        this.systemId = entity.getSystemDB().getSystemId();
        this.userId = entity.getUser().getUserId();
        this.createDt = entity.getCreateDt();
        this.updateDt = entity.getUpdateDt();
    }
    public SystemAdminDto(){

    }
    public SystemAdmin toEntity(){
        return SystemAdmin.builder()
                .createDt(this.createDt)
                .updateDt(this.updateDt)
                .build();
    }
}
