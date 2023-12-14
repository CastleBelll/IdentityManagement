package com.example.TestProject.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "SYSTEM_KEYWORD")
@NoArgsConstructor
public class SystemKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "SYSTEM_ID", referencedColumnName = "SYSTEM_ID")
    private SystemDB systemDB;

    @Column(name = "LOGIN_ID")
    private String loginId;

    @Column(name = "LOGIN_PASSWD")
    private String loginPasswd;

    @Column(name = "LOGIN_PORT")
    private String loginPort;

    @Column(name = "LOGIN_DRIVER_URL")
    private String loginDriverUrl;

    @Column(name = "LOGIN_PROTOCOL")
    private String loginProtocol;

    @Builder
    public SystemKeyword(int id, String loginId, SystemDB systemDB,String loginPasswd, String loginPort, String loginDriverUrl, String loginProtocol) {
        this.id=id;
        this.systemDB = systemDB;
        this.loginId = loginId;
        this.loginPasswd = loginPasswd;
        this.loginPort = loginPort;
        this.loginDriverUrl = loginDriverUrl;
        this.loginProtocol = loginProtocol;
    }
}
