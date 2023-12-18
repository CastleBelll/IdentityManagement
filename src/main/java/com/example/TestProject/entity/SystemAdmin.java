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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name ="SYSTME_ADMIN_NUM")
    private Long systemAdminNum;

    @Column(name = "C_DT")
    private String createDt;

    @Column(name = "U_DT")
    private String updateDt;

    @ManyToOne
    @JoinColumn(name = "SYSTEM_ID", referencedColumnName = "SYSTEM_ID")
    private SystemDB systemDB;

    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")
    private  User user;

    @Builder
    public SystemAdmin(Long systemAdminNum, String createDt, String updateDt, SystemDB systemDb, User user){
        this.systemAdminNum = systemAdminNum;

        this.systemDB = systemDb;
        this.user = user;
        this.createDt = createDt;
        this.updateDt = updateDt;
    }
}
