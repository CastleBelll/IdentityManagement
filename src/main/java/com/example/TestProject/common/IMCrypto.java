package com.example.TestProject.common;

public interface IMCrypto {
    /**
     * 평문 암호화
     * @param plainData
     * @return [암호형태]암호화문
     */
    public String encrypt(String plainData) throws Exception;

    /**
     * 암호화 복호화
     * @param encryptData
     * @return 평문
     */
    public String decrypt(String encryptData) throws Exception;

    /**
     * 암호화 여부 확인
     * @param data
     * @return [true|false]
     */
    public boolean isEncryptData(String data);
}
