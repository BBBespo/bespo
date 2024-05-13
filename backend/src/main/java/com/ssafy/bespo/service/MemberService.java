package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.MemberDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

//    public MemberDto.UserDto getMember(OauthDto userInfo) {
//        Member member = memberRepository.findByEmailAndFlagFalse(userInfo.getEmail());
//        if (member == null){ // 신규 회원
//            member = userInfo.toEntity();
//            memberRepository.save(member);
//            MemberDto.UserDto userDto = MemberDto.UserDto.toUserDto(member);
//            userDto.setCreatedNow(true);
//            return userDto;
//        }
//        MemberDto.UserDto userDto = MemberDto.UserDto.toUserDto(member);
//        userDto.setCreatedNow(false);
//
//        return userDto;
//    }



}
