package com.example.TestProject.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class WindowsService {

    public String getWindowsAcconts(String command) {
        try {
            // Execute PowerShell command
            Process powerShellProcess = Runtime.getRuntime().exec("powershell.exe -Command " + command);
            powerShellProcess.getOutputStream().close();

            // Read the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(powerShellProcess.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }

            // Check for errors
            StringBuilder errorResult = new StringBuilder();
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(powerShellProcess.getErrorStream()));
            String errorLine;
            while ((errorLine = errorReader.readLine()) != null) {
                errorResult.append(errorLine).append("\n");
            }

            //성공 시 DB에 저장 하는 로직 추가 예정

            if (errorResult.length() > 0) {
                throw new RuntimeException("PowerShell execution error:\n" + errorResult.toString());
            }

            return result.toString();
        } catch (IOException e) {
            throw new RuntimeException("PowerShell execution error", e);
        }
    }
}
