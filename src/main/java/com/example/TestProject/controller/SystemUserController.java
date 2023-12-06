package com.example.TestProject.controller;

import com.example.TestProject.common.Common;
import com.example.TestProject.service.DBMSService;
import com.example.TestProject.service.LinuxService;
import com.example.TestProject.service.WindowsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3000)

/*시스템 ID에 대한 모든 작업
계정 리스트,
계정 생성,
계정 변경,
계정 삭제

추후에 Entity 생성 후 DB에 같이 업데이트 예정
*/
public class SystemUserController {

    @Autowired
    WindowsService windowsService;
    @Autowired
    LinuxService linuxService;
    @Autowired
    DBMSService dbmsService;
    Common common;
    @GetMapping("/getWindowsAccounts")
    public String getWindowsAccounts(@RequestParam String host,
                              @RequestParam String username,
                              @RequestParam String password) {
        // URL encode the password


        // PowerShell command to get user accounts
        String powerShellCommand = "Invoke-Command -ComputerName " + host +
                " -Credential (New-Object PSCredential -ArgumentList @('" + username + "', (ConvertTo-SecureString -String '" + password + "' -AsPlainText -Force)))" +
                " -ScriptBlock {Get-WmiObject Win32_UserAccount | Select-Object Name}";

        // PowerShell execution and result retrieval
        String accountsList = windowsService.getWindowsAcconts(powerShellCommand);

        return "계정 리스트:\n" + accountsList;
    }

    @GetMapping("/getLinuxAccounts")
    public String getLinuxAccounts(@RequestParam String host,
                                   @RequestParam String username,
                                   @RequestParam String password) {
        // URL encode the password

        // SSH connection and get user accounts command
        String sshCommand = "cat /etc/passwd";
        String accountsList = linuxService.getLinuxAccounts(host, username, password, sshCommand);

        return "계정 리스트:\n" + accountsList;
    }

    @GetMapping("/getMySQLAccounts")
    public List<String> getDatabaseAccounts(
            @RequestParam String ip,
            @RequestParam String database,
            @RequestParam int port,
            @RequestParam String user,
            @RequestParam String password) {

        return dbmsService.getMySQLAccounts(ip, database, port, user, password);
    }

    @GetMapping("/getPostgreSQLAccounts")
    public List<Map<String, Object>> getPostgreSQLAccounts(
            @RequestParam String ip,
            @RequestParam String database,
            @RequestParam int port,
            @RequestParam String user,
            @RequestParam String password) {

        return dbmsService.getPostgreSQLAccounts(ip, database, port, user, password);
    }
}
