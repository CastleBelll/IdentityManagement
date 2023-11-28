package com.example.TestProject.auth.dto;

import com.example.TestProject.auth.entity.Auth;
import lombok.*;

@Data
public class AuthResponseDto {
    private String tokenType;
    private String accessToken;
    private String refreshToken;

    @Builder
    public AuthResponseDto(Auth entity) {
        this.tokenType = entity.getTokenType();
        this.accessToken = entity.getAccessToken();
        this.refreshToken = entity.getRefreshToken();
    }
}
