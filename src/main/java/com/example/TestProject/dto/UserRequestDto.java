package com.example.TestProject.dto;


import com.example.TestProject.entity.Role;
import com.example.TestProject.entity.User;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    private Role role;
    private String userId;
    private String userName;
    private String userPassword;
    private String createDate;
    private String updateDate;


    public User toEntity() {
        return User.builder()
                .role(this.role)
                .userId(this.userId)
                .userPassword(this.userPassword)
                .userName(this.userName)
                .createDate(this.createDate)
                .updateDate(this.updateDate)
                .build();
    }
}
