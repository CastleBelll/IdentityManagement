package com.example.TestProject.service;

import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.repository.SystemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SystemDBService {
    private final SystemRepository systemRepository;

    @Transactional
    public int save(SystemDto requestDto) {
        requestDto.setCreateBy("manager");
        requestDto.setSyncYn("N");
        requestDto.setCreateDt(LocalDateTime.now().toString());
        requestDto.setSyncDt(LocalDateTime.now().toString());
        return systemRepository.save(requestDto.toEntity()).getSystemNum();
    }

    @Transactional(readOnly = true)
    public List<SystemDto> findAllDesc() {
        return systemRepository.findAll().stream()
                .map(SystemDto::new)
                .collect(Collectors.toList());
    }

//    public void getSystemUser() {
//        String remoteServer = "원격서버주소";
//        String username = "원격서버사용자";
//        String password = "원격서버비밀번호";
//
//        // 변경할 계정 정보
//        String accountName = "변경할계정이름";
//        String newPassword = "새로운패스워드";
//
//        // PowerShell 스크립트를 실행하는 명령어
//        String command = "powershell.exe -ExecutionPolicy Bypass -NoLogo -NoProfile -NonInteractive -Command \"Invoke-Command -ComputerName " +
//                remoteServer +
//                " -Credential (New-Object -TypeName PSCredential -ArgumentList '" +
//                username +
//                "', (ConvertTo-SecureString '" +
//                password +
//                "' -AsPlainText -Force)) -ScriptBlock { Set-LocalUser -Name '" +
//                accountName +
//                "' -Password (ConvertTo-SecureString '" +
//                newPassword + "' -AsPlainText -Force) }\"";
//
//        Process powerShellProcess = Runtime.getRuntime().exec(command);
//
//        // PowerShell 스크립트의 출력을 읽기
//        BufferedReader reader = new BufferedReader(new InputStreamReader(powerShellProcess.getInputStream()));
//        String line;
//        while ((line = reader.readLine()) != null) {
//            System.out.println(line);
//        }
//
//        // 에러 스트림의 내용도 출력
//        BufferedReader errorReader = new BufferedReader(new InputStreamReader(powerShellProcess.getErrorStream()));
//        String errorLine;
//        while ((errorLine = errorReader.readLine()) != null) {
//            System.err.println("Error: " + errorLine);
//        }
//
//        powerShellProcess.waitFor();
//    }
}
