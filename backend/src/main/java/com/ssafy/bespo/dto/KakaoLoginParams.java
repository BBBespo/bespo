package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.OAuthProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
@NoArgsConstructor
public class KakaoLoginParams {
    private String authorizationCode;

    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        return body;
    }

    public OAuthProvider oAuthProvider() {
        return OAuthProvider.KAKAO;
    }
}