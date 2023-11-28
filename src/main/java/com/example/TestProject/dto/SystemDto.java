package com.example.TestProject.dto;


import com.example.TestProject.entity.SystemDB;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter

public class SystemDto {

    private String systemId;

    private int systemNum;

    private String systemName;

    private String systemDesc;

    private String systemCategory;

    private String systemType;

    private String ipAddr;

    private String systemGroup;

    private String createDt;

    private String createBy;

    private String syncDt;

    private String syncYn;

    @Builder
    public SystemDto(String systemId, int systemNum, String systemName, String systemDesc, String systemCategory, String systemType, String ipAddr, String systemGroup, String createDt, String createBy, String syncDt, String syncYn) {
        this.systemId = systemId;
        this.systemNum = systemNum;
        this.systemName = systemName;
        this.systemDesc = systemDesc;
        this.systemCategory = systemCategory;
        this.systemType = systemType;
        this.ipAddr = ipAddr;
        this.systemGroup = systemGroup;
        this.createDt = createDt;
        this.createBy = createBy;
        this.syncDt = syncDt;
        this.syncYn = syncYn;
    }

    public SystemDto(){

    }
    public SystemDto(SystemDB entity) {
        this.systemId = entity.getSystemId();
        this.systemNum = entity.getSystemNum();
        this.systemName = entity.getSystemName();
        this.systemDesc = entity.getSystemDesc();
        this.systemCategory = entity.getSystemCategory();
        this.systemType = entity.getSystemType();
        this.ipAddr = entity.getIpAddr();
        this.systemGroup = entity.getSystemGroup();
        this.createDt = entity.getCreateDt();
        this.createBy = entity.getCreateBy();
        this.syncDt = entity.getSyncDt();
        this.syncYn = entity.getSyncYn();
    }

    public SystemDB toEntity(){
        return SystemDB.builder()
                .createDt(this.createDt)
                .systemId(this.systemId)
                .createBy(this.createBy)
                .systemCategory(this.systemCategory)
                .systemNum(this.systemNum)
                .systemType(this.systemType)
                .systemDesc(this.systemDesc)
                .systemGroup(this.systemGroup)
                .systemName(this.systemName)
                .syncDt(this.syncDt)
                .syncYn(this.syncYn)
                .ipAddr(this.ipAddr)
                .build();

    }
}
