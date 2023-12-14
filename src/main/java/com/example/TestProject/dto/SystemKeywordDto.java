package com.example.TestProject.dto;


import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.SystemKeyword;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class SystemKeywordDto {

    private String systemId;

    private int id;

    private String loginId;

    private String loginPasswd;

    private String loginPort;

    private String loginDriverUrl;

    private String loginProtocol;

    @Builder
    public SystemKeywordDto(int id, String systemId, String loginId, String loginPasswd, String loginPort,
                            String loginDriverUrl, String loginProtocol) {
      this.id = id;
      this.systemId = systemId;
      this.loginId = loginId;
      this.loginPasswd = loginPasswd;
      this.loginPort = loginPort;
      this.loginDriverUrl = loginDriverUrl;
      this.loginProtocol = loginProtocol;
    }

    public SystemKeywordDto(){

    }
    public SystemKeywordDto(SystemKeyword entity) {
        this.id = entity.getId();
        this.systemId = entity.getSystemDB().getSystemId();
        this.loginId = entity.getLoginId();
        this.loginPasswd = entity.getLoginPasswd();
        this.loginPort = entity.getLoginPort();
        this.loginDriverUrl = entity.getLoginDriverUrl();
        this.loginProtocol = entity.getLoginProtocol();
    }

    public SystemKeyword toEntity(){
        return SystemKeyword.builder()
                .id(this.id)
                .systemDB(this.toEntity().getSystemDB())
                .loginId(this.loginId)
                .loginPasswd(this.loginPasswd)
                .loginPort(this.loginPort)
                .loginDriverUrl(this.loginDriverUrl)
                .loginProtocol(this.loginProtocol)
                .build();
    }
}
