package com.example.TestProject.entity;


import com.example.TestProject.auth.entity.Auth;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Data
@Table(name = "USER_TB")  //맵핑할 db의 table 이름
@Entity
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name ="USER_NUM", insertable = false)
    private Long userNum;

    @Column(name = "USER_ID", unique=true)
    private String userId;

    @Column(name = "USER_NAME")
    private String  userName;

    @Column(name = "USER_PASSWORD")
    private String userPassword;

    @Column(name = "C_DT")
    private String createDate;

    @Column(name = "U_DT")
    private String updateDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Auth auth;
    @Builder
    public User(String userId, String userName, String userPassword,
                String createDate, String updateDate, Role role){
        this.userId = userId;
        this.userName = userName;
        this.userPassword = userPassword;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.role = role;
    }
}
