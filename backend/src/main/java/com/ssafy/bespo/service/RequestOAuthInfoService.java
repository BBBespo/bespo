package com.ssafy.bespo.service;

import com.ssafy.bespo.Enum.OAuthProvider;
import com.ssafy.bespo.dto.KakaoApiClient;
import com.ssafy.bespo.dto.KakaoInfoResponse;
import com.ssafy.bespo.dto.KakaoLoginParams;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class RequestOAuthInfoService {

    private final Map<OAuthProvider, KakaoApiClient> clients;

    public RequestOAuthInfoService(List<KakaoApiClient> clients) {
        this.clients = clients.stream().collect(
                Collectors.toUnmodifiableMap(KakaoApiClient::oAuthProvider, Function.identity())
        );
    }

    public KakaoInfoResponse request(KakaoLoginParams params) {
        KakaoApiClient client = clients.get(params.oAuthProvider());
        String accessToken = client.requestAccessToken(params);
        return client.requestOauthInfo(accessToken);
    }

}
