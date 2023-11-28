package com.example.TestProject.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "SERVICE_ACCOUNT")
@NoArgsConstructor
@AllArgsConstructor
public class ServiceAccount {
    @Id
    @Column(name ="AC_ID")
    private String accountId;

    @ManyToOne
    @JoinColumn(name="OS_ID")
    private OsAccount osAccount;

    @ManyToOne
    @JoinColumn(name="WEB_ID")
    private WebAccount webAccount;

    @Column(name = "OS_USER_ID", unique = true)
    private String osUserId;
}
