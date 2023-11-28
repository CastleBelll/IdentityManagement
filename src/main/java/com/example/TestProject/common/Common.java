package com.example.TestProject.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Common {
    //Date 를 String 으로
    public String DateToString(LocalDateTime ldt){
            String rtn = "";
            ldt = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        rtn = ldt.format(formatter);

        return rtn;
    }

    //Stirng 을 Date로
    public LocalDateTime StringToDate(String dateformat){
        LocalDateTime rtn;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        rtn = LocalDateTime.parse(dateformat, formatter);

        return rtn;
    }


    //파라미터 전달 시 특수문자('#') 기호가 공백으로 인식되어 URL 인코딩 필요
    public String encodeUrlParameter(String parameter) {
        try {
            return java.net.URLEncoder.encode(parameter, "UTF-8");
        } catch (java.io.UnsupportedEncodingException e) {
            throw new RuntimeException("URL 인코딩 중 오류 발생", e);
        }
    }
}
