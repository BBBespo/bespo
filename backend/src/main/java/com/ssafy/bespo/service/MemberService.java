package com.ssafy.bespo.service;

import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.dto.MemberDto;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;

    public void changeMemberInfo(String accessToken, MemberDto.UpdateMemberRequest request, String imgUrl) {
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);

        member.updateMember(request.getName(), request.getRole(), request.getWeight(), request.getHeight(),
                request.getBirth(), request.getBackNumber(), imgUrl, request.getTel());

        memberRepository.save(member);
    }

    public MemberDto.readMemberResponse registerMemberByToken(String accessToken, MemberDto.UpdateMemberRequest request, String imgUrl){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) {
            if(memberRepository.findByMemberId(memberId) == null)
                throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
            else {
                member = memberRepository.findByMemberId(memberId);
                member.shallowRegister();
            }
        }
        member.updateMember(request.getName(), request.getRole(), request.getWeight(), request.getHeight(),
                request.getBirth(), request.getBackNumber(), imgUrl, request.getTel());

        memberRepository.save(member);

        MemberDto.readMemberResponse response = MemberDto.readMemberResponse.builder()
                .memberId(member.getMemberId())
                .tel(member.getTel())
                .backNumber(member.getBackNumber())
                .birth(member.getBirth())
                .email(member.getEmail())
                .height(member.getHeight())
                .weight(member.getWeight())
                .name(member.getName())
                .role(member.getRole())
                .imgUrl(member.getImgUrl())
                .build();
        if(member.getTeam() != null)
            response.setTeam(member.getTeam().toReadTeam());

        return response;
    }

    public void deleteMember(String accessToken){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        member.shallowDelete();
        memberRepository.save(member);
    }

    public MemberDto.readMemberResponse readMember(int memberId){
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        Team team = member.getTeam();

        MemberDto.readMemberResponse response = MemberDto.readMemberResponse.builder()
                .memberId(memberId)
                .role(member.getRole())
                .name(member.getName())
                .tel(member.getTel())
                .weight(member.getWeight())
                .height(member.getHeight())
                .email(member.getEmail())
                .backNumber(member.getBackNumber())
                .birth(member.getBirth())
                .build();

        if(team != null) response.setTeam(team.toReadTeam());

        return response;
    }

}
