package com.example.TestProject.auth.service;
import com.example.TestProject.auth.dto.CustomUserDetails;
import com.example.TestProject.entity.User;
import com.example.TestProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;	// 별도로 생성해야 함

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(userId).orElseThrow(
                () -> new UsernameNotFoundException("해당 유저가 존재하지 않습니다. userId = " + userId));
        return new CustomUserDetails(user);	// 위에서 생성한 CustomUserDetails Class
    }

    // 필요시 추가
    public UserDetails loadUserByUserNum(Long userNum) throws IllegalArgumentException {
        User user = userRepository.findByUserNum(userNum).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. userNum = " + userNum));
        return new CustomUserDetails(user);
    }
//
//    // 필요시 추가
//    public UserDetails loadUserByEmail(String email) throws IllegalArgumentException {
//        User user = userRepository.findByEmail(email).orElseThrow(
//                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. email = " + email));
//        return new CustomUserDetails(user);
//    }
}
