package com.ssafy.bespo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bespo.Enum.OAuthProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoInfoResponse {

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    public OAuthProvider getOAuthProvider() {
        return OAuthProvider.KAKAO;
    }

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class KakaoAccount {
        private KakaoProfile profile;
        private String email;
    }

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class KakaoProfile {
        private String nickname;
    }

    public String getEmail() {
        return kakaoAccount.email;
    }

    public String getNickname() {
        return kakaoAccount.profile.nickname;
    }

}
