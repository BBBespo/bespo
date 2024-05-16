package com.ssafy.bespo.service;


import com.ssafy.bespo.dto.AuthTokens;
import com.ssafy.bespo.dto.KakaoInfoResponse;
import com.ssafy.bespo.dto.KakaoLoginParams;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthLoginService {

    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthTokens login(KakaoLoginParams params) {
        KakaoInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        Integer memberId = findOrCreateMember(oAuthInfoResponse);
        return authTokensGenerator.generate(memberId);
    }

    private Integer findOrCreateMember(KakaoInfoResponse oAuthInfoResponse) {
        return memberRepository.findByEmail(oAuthInfoResponse.getEmail())
                .map(Member::getMemberId)
                .orElseGet(() -> newMember(oAuthInfoResponse));
    }

    private Integer newMember(KakaoInfoResponse oAuthInfoResponse) {
        Member member = Member.builder()
                .email(oAuthInfoResponse.getEmail())
                .name(oAuthInfoResponse.getNickname())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        return memberRepository.save(member).getMemberId();
    }

}
