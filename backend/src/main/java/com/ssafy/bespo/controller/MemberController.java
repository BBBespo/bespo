package com.ssafy.bespo.controller;

import com.ssafy.bespo.dto.AuthTokens;
import com.ssafy.bespo.dto.KakaoLoginParams;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.service.OAuthLoginService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/members")
@Slf4j
public class MemberController {

    private final OAuthLoginService oAuthLoginService;
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;

    @PostMapping("/kakao")
    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoLoginParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @GetMapping("/{accessToken}")
    public ResponseEntity<Member> findByAccessToken(@PathVariable String accessToken) {
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        return ResponseEntity.ok(memberRepository.findById(memberId).get());
    }

}
