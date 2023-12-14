package com.example.TestProject.controller;

import com.example.TestProject.common.EncodePassword;
import com.example.TestProject.dto.SystemAccountDto;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.entity.SystemAccount;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.repository.SystemRepository;
import com.example.TestProject.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
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
    @Autowired
    SystemAccountService systemAccountService;
    @Autowired
    SystemDBService systemDBService;
    @Autowired
    SystemRepository systemRepository;


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

    @Transactional
    @GetMapping("/getLinuxAccounts")
    public String getLinuxAccounts(@RequestParam String systemId,
                                    @RequestParam String ipAddr,
                                   @RequestParam String loginId,
                                   @RequestParam String loginPasswd) {
        // URL encode the password
        EncodePassword en = new EncodePassword();

        boolean isEncrypt = en.isEncryptData(loginPasswd);

        try{
        if(isEncrypt){
            loginPasswd = en.decrypt(loginPasswd);
        }
        }catch(Exception e){
            System.out.println("복호화 실패");
            e.printStackTrace();
        }


        // SSH connection and get user accounts command
        String sshCommand = "getent passwd | awk -F: '{print $1, $4}' | while read -r user group; do groups=$(id -Gn $user); echo \"$user^$groups\"; done";
        String accountsList = "";
        try {
            accountsList = linuxService.getLinuxAccounts(ipAddr, loginId, loginPasswd, sshCommand);
        }catch(Exception e){
            e.printStackTrace();
            systemRepository.updateSyncBySystemId(systemId,"N");
        }
        System.out.println("리스트 : "+accountsList);

        String[] parts = accountsList.split("\n");

        for(int i=0; i<parts.length; i++){
            System.out.println(i + " : " + parts[i]);
        }



        Map<String, String> userGroupMap = new HashMap<>();

        for (String part : parts) {
            String[] keyValue = part.split("\\^");
            if (keyValue.length == 2) {
                String user = keyValue[0];
                String group = keyValue[1];
                userGroupMap.put(user, group);
            }
        }

        SystemDB systemDB = systemDBService.getSystemById(systemId);
        for (String key : userGroupMap.keySet()){

            SystemAccount systemAccount = new SystemAccount();
            systemAccount.setSystemDB(systemDB);
            systemAccount.getSystemDB().setSystemId(systemId);
            systemAccount.setSystemUserId(key);
            systemAccount.setSystemUserGroup(userGroupMap.get(key));

            systemAccountService.saveSystemAccount(systemAccount);
        }

        System.out.println("userGroupMap : "+userGroupMap);


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
