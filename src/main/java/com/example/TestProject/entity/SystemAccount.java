package com.example.TestProject.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "SYSTEM_ACCOUNT")
@NoArgsConstructor
@AllArgsConstructor
public class SystemAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "ID")
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "SYSTEM_ID", referencedColumnName = "SYSTEM_ID")
    private SystemDB systemDB;

    @Column(name = "SYSTEM_USER_ID")
    private String systemUserId;

    @Column(name = "SYSTEM_USER_PASSWD")
    private String systemUserPasswd;

    @Column(name = "C_DT")
    private String c_dt;

    @Column(name = "SERVICE_USER_GROUP")
    private String serviceUserGroup;

    @Column(name = "SERVICE_USER_PASSWD_SYNC")
    private String serviceUserPasswdSync;
}
