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
import com.ssafy.bespo.service.S3UploaderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("api/members")
@Slf4j
public class MemberController {

    private final OAuthLoginService oAuthLoginService;
    private final MemberService memberService;
    private final AuthTokensGenerator authTokensGenerator;
    private final S3UploaderService s3UploaderService;
    private final MemberRepository memberRepository;

    @PostMapping("/kakao")
    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoLoginParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @GetMapping()
    public ResponseEntity<Message> findByAccessToken(@RequestHeader String accessToken) {
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Message message = new Message("유저 조회 성공", memberService.readMember(memberId));
        return ResponseEntity.ok(message);
    }

    @PutMapping(value = "/update", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Message> updateMember(@RequestHeader String accessToken, @RequestPart MemberDto.UpdateMemberRequest request, @RequestPart(required = false) MultipartFile image) throws IOException {
        String url;
        if(image != null)
            url = s3UploaderService.upload(image, "member");
        else{
            int memberId = authTokensGenerator.extractMemberId(accessToken);
            url = memberRepository.findByMemberId(memberId).getImgUrl();
        }
        memberService.changeMemberInfo(accessToken, request, url);
        Message message = new Message("유저 정보 수정 완료");
        return ResponseEntity.ok(message);

    }

    @PostMapping(value = "/signup", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Message> registerMember(@RequestHeader String accessToken, @RequestPart MemberDto.UpdateMemberRequest request, @RequestPart(required = false) MultipartFile image) throws IOException {
        String url;
        if(image != null)
            url = s3UploaderService.upload(image, "member");
        else url = "https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG";
        Message message = new Message("유저 정보 등록 완료", memberService.registerMemberByToken(accessToken, request, url));
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/withdraw")
    public ResponseEntity<Message> withdraw(@RequestHeader String accessToken){
        memberService.deleteMember(accessToken);
        Message message = new Message("회원탈퇴 완료");
        return ResponseEntity.ok(message);
    }


}
