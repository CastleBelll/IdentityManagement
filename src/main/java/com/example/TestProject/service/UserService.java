package com.example.TestProject.service;

import com.example.TestProject.common.Common;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.dto.UserRequestDto;
import com.example.TestProject.dto.UserResponseDto;
import com.example.TestProject.entity.Role;
import com.example.TestProject.entity.User;
import com.example.TestProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    LocalDateTime currentDateTime = LocalDateTime.now();
    Common common = new Common() ;

    /** 회원가입 */
    @Transactional

    public void save(UserRequestDto requestDto) {
        // SAVE USER ENTITY
        requestDto.setRole(Role.ROLE_USER);
        requestDto.setUserPassword(passwordEncoder.encode(requestDto.getUserPassword()));
        requestDto.setCreateDate(common.DateToString(currentDateTime));
        requestDto.setUpdateDate("");
        this.userRepository.save(requestDto.toEntity());
    }

    /** User 조회 */
    @Transactional
    public UserResponseDto findByUserNum(Long userNum) {
        User user = this.userRepository.findById(userNum).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userNum));
        return new UserResponseDto(user);
    }

    /** User 수정 */
//    @Transactional
//    public void update(Long id, UserRequestDto requestDto) {
//        User user = this.userRepository.findById(id).orElseThrow(
//                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
//        user.update(requestDto);
//    }

    /** User 삭제 */
    @Transactional
    public void delete(Long userNum) {
        User user = this.userRepository.findById(userNum).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userNum));
        this.userRepository.delete(user);
    }
    @Transactional(readOnly = true)
    public List<UserResponseDto> getUserList(){
        return userRepository.findAll().stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
    }
}