package com.example.TestProject.controller;

import com.example.TestProject.auth.jwt.JwtTokenProvider;
import com.example.TestProject.dto.UserRequestDto;
import com.example.TestProject.dto.UserResponseDto;
import com.example.TestProject.entity.Role;
import com.example.TestProject.repository.UserRepository;
import com.example.TestProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class UserRestController {

    private final UserService userService;


    private final JwtTokenProvider jwtTokenProvider;

    /** 회원정보 조회 API */
    @GetMapping("/api/v1/user")
    public ResponseEntity<?> findUser(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        UserResponseDto userResponseDto = this.userService.findByUserNum(id);
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }

    /** 회원정보 수정 API */
    @PutMapping("/api/v1/user")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String accessToken,
                                        @RequestBody UserRequestDto requestDto) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
//        this.userService.update(id, requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    /** 회원정보 삭제 API */
    @DeleteMapping("/api/v1/user")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        this.userService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    /** 회원가입 API */
    @PostMapping("/api/v1/user")
    public ResponseEntity<?> singUp(@RequestBody UserRequestDto requestDto) {
        System.out.println(requestDto.getUserId()+" "+ requestDto.getUserPassword());

        this.userService.save(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
