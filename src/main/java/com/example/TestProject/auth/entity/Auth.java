package com.example.TestProject.auth.entity;

import com.example.TestProject.entity.User;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Auth  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tokenType;

    @Column(nullable = false)
    private String accessToken;

    @Column(nullable = false)
    private String refreshToken;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Auth(User user, String tokenType, String accessToken, String refreshToken) {
        this.user = user;
        this.tokenType = tokenType;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    public void updateAccessToken(String newAccessToken){
        this.accessToken = newAccessToken;
    }
    public void updateRefreshToken(String newRefreshToken){
        this.refreshToken = newRefreshToken;
    }
}
