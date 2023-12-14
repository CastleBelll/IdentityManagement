package com.example.TestProject.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "SYSTEM_DB")
@NoArgsConstructor
public class SystemDB  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "SYSTEM_NUM")
    private int systemNum;

    @Column(name = "SYSTEM_ID", unique = true )
    private String systemId;

    @Column(name = "SYSTEM_NAME")
    private String systemName;

    @Column(name = "SYSTEM_DESC")
    private String systemDesc;

    @Column(name = "SYSTEM_CATEGORY")
    private String systemCategory;

    @Column(name = "SYSTEM_TYPE")
    private String systemType;

    @Column(name = "IP_ADDR")
    private String ipAddr;

    @Column(name = "SYSTEM_GROUP")
    private String systemGroup;

    @Column(name = "C_DT")
    private String createDt;

    @Column(name = "C_BY")
    private String createBy;

    @Column(name = "SYNC_DT")
    private String syncDt;

    @Column(name = "SYNC_YN")
    private String syncYn;

    @Builder
    public SystemDB(String systemId, int systemNum, String systemName,
                    String systemDesc, String systemCategory, String systemType,
                    String ipAddr, String systemGroup, String syncDt,
                    String createBy, String syncYn, String createDt) {
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
        this.syncYn = syncYn;
        this.syncDt = syncDt;
    }
}
