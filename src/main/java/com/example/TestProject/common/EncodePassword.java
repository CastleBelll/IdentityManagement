package com.example.TestProject.common;

import kr.re.nsr.seed.SEEDCBCCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class EncodePassword implements IMCrypto{
    private final String PREFIX = "[SEED128]";

    @Override
    public String encrypt(String data) throws Exception {
        byte[] K = "@)%VsVA%`r<q5Fv.".getBytes(); // 16
        byte[] I = "sxDh\"R\\PqE^5*=}2".getBytes(); // 16
        if(data == null || data.isEmpty() || K == null || I == null) {
            return null;
        }
        byte[] encData = SEEDCBCCrypt.SEED_CBC_Encrypt(K, I, data.getBytes(), 0, data.getBytes().length);
        K = null;
        I = null;
        return PREFIX + new String(Base64.getUrlEncoder().encode(encData)).replace("=", "");
    }

    @Override
    public String decrypt(String data) throws Exception {
        byte[] K = "@)%VsVA%`r<q5Fv.".getBytes(); // 16
        byte[] I = "sxDh\"R\\PqE^5*=}2".getBytes(); // 16
        if(data == null || data.isEmpty() || K == null || I == null) {
            return null;
        }
        data = data.replace(PREFIX, "");
        byte[] decData = SEEDCBCCrypt.SEED_CBC_Decrypt(K, I, Base64.getUrlDecoder().decode(data), 0, Base64.getUrlDecoder().decode(data).length);
        K = null;
        I = null;
        return new String(decData);
    }

    @Override
    public boolean isEncryptData(String data) {
        if(data == null || data.isEmpty()) return false;
        return data.startsWith(PREFIX);
    }
}
