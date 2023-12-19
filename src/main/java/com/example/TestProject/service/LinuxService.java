package com.example.TestProject.service;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
@Service
public class LinuxService {
    public String getLinuxAccounts(String ipAddr, String loginId, String loginPasswd, String command, String port) {
        int port2 = Integer.parseInt(port);

        System.out.println("ipAddr : "+ipAddr + " loginId : "+loginId + " loginPasswd : "+loginPasswd);

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(loginId, ipAddr, port2);
            session.setPassword(loginPasswd);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            // Execute SSH command
            ChannelExec channelExec = (ChannelExec) session.openChannel("exec");
            channelExec.setCommand(command);

            InputStream in = channelExec.getInputStream();
            channelExec.connect();

            // Read the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }

            // Disconnect
            channelExec.disconnect();
            session.disconnect();

            //성공 시 DB에 저장 하는 로직 추가 예정

            return result.toString();
        } catch (JSchException | java.io.IOException e) {
            throw new RuntimeException("SSH 연결 중 오류 발생", e);
        }
    }

    public String UpdateLinuxPassword(String ipAddr, String loginId, String loginPasswd, String command, String port) {
        int port2 = Integer.parseInt(port);

        System.out.println("ipAddr : "+ipAddr + " loginId : "+loginId + " loginPasswd : "+loginPasswd);

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(loginId, ipAddr, port2);
            session.setPassword(loginPasswd);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            // Execute SSH command
            ChannelExec channelExec = (ChannelExec) session.openChannel("exec");
            channelExec.setCommand(command);

            InputStream in = channelExec.getInputStream();
            channelExec.connect();

            // Read the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }

            // Disconnect
            channelExec.disconnect();
            session.disconnect();

            return result.toString();
        } catch (JSchException | java.io.IOException e) {
            throw new RuntimeException("패스워드 변경 실패", e);
        }
    }
}
