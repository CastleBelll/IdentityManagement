package com.example.TestProject.entity;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@Table(name = "WEB_ACCOUNT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebAccount {
    @Id
    @Column(name = "WEB_ID")
    String webId;

    @Column(name = "WEB_NAME")
    String webName;

    @Column(name = "WEB_QUALIFICATION")
    String webQualification;
}
