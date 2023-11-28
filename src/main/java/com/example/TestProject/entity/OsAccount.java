package com.example.TestProject.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "OS_ACCOUNT")
@NoArgsConstructor
@AllArgsConstructor
public class OsAccount {
    @Id
    @Column(name ="OS_ID")
    private String OsId;

    @ManyToOne
    @JoinColumn(name="WEB_ID")
    private WebAccount webAccount;

    @Column(name = "OS_CATEGORIES")
    private String osCategories;
}
