package com.example.TestProject.dto;

import com.example.TestProject.entity.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponseDto {
    private Long userNum;
    private String role;
    private String userId;
    private String userName;
    private String createDate;
    private String updateDate;

    public UserResponseDto(User entity){
        this.userNum = entity.getUserNum();
        this.role = entity.getRole().name();
        this.userName = entity.getUserName();
        this.userId = entity.getUserId();
        this.createDate = entity.getCreateDate();
        this.updateDate = entity.getUpdateDate();
    }
}
