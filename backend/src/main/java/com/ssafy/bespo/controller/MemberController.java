package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.AuthTokens;
import com.ssafy.bespo.dto.KakaoLoginParams;
import com.ssafy.bespo.dto.MemberDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.service.MemberService;
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
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;

    @PostMapping("/kakao")
    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoLoginParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @GetMapping("/{accessToken}")
    public ResponseEntity<Message> findByAccessToken(@PathVariable String accessToken) {
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Message message = new Message("유저 조회 성공", memberService.readMember(memberId));
        return ResponseEntity.ok(message);
    }

    @PutMapping("/update")
    public ResponseEntity<Message> updateMember(@RequestHeader String accessToken, @RequestBody MemberDto.UpdateMemberRequest request){
        memberService.changeMemberInfo(accessToken, request);
        Message message = new Message("유저 정보 수정 완료");
        return ResponseEntity.ok(message);

    }

    @PostMapping("/signup")
    public ResponseEntity<Message> registerMember(@RequestHeader String accessToken, @RequestBody MemberDto.UpdateMemberRequest request){
        Message message = new Message("유저 정보 등록 완료", memberService.registerMemberByToken(accessToken, request));
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/withdraw")
    public ResponseEntity<Message> withdraw(@RequestHeader String accessToken){
        memberService.deleteMember(accessToken);
        Message message = new Message("회원탈퇴 완료");
        return ResponseEntity.ok(message);
    }



}
