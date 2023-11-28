package com.example.TestProject.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "SYSTEM_ADMIN_TB")  //맵핑할 db의 table 이름
@Entity
@NoArgsConstructor
public class SystemAdmin {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name ="SYSTME_ADMIN_NUM")
    private Long systemAdminNum;

    @Id
    @Column(name = "SYSTME_ADMIN_ID")
    private String systemAdminId;

    @Column(name = "SYSTME_ADMIN_NAME")
    private String  systemAdminName;

    @Column(name = "SYSTME_ADMIN_PASSWORD")
    private String systemAdminPassword;

    @Column(name = "C_DT")
    private String createDt;

    @Column(name = "U_DT")
    private String updateDt;

    @ManyToOne
    @JoinColumn(name = "SYSTEM_ID")
    private SystemDB systemDB;

    @ManyToOne

    @JoinColumn(name = "USER_ID")
    private  User user;

    @Builder
    public SystemAdmin(Long systemAdminNum, String systemAdminId, String systemAdminName, String systemAdminPassword,
                       String createDt, String updateDt, SystemDB systemDb, User user){
        this.systemAdminNum = systemAdminNum;
        this.systemAdminName = systemAdminName;
        this.systemAdminId = systemAdminId;
        this.systemAdminPassword = systemAdminPassword;
        this.systemDB = systemDb;
        this.user = user;
        this.createDt = createDt;
        this.updateDt = updateDt;
    }
}
