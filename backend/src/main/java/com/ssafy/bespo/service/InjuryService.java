package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.InjuryDto;
import com.ssafy.bespo.entity.Injury;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.InjuryRepository;
import com.ssafy.bespo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class InjuryService {

    private final InjuryRepository injuryRepository;
    private final MemberRepository memberRepository;

    public Injury registerInjury(InjuryDto.createInjuryRequest request){
        Member member = memberRepository.findByMemberIdAndFlagFalse(request.getMemberId());
        if(member == null){
            throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        }

        Injury injury = Injury.builder()
            .injuryArea(request.getInjury().getInjuryArea())
            .injuryLevel(request.getInjury().getInjuryLevel())
            .injuryCause(request.getInjury().getInjuryCause())
            .isContact(request.getInjury().getIsContact())
            .member(member)
            .build();

        injuryRepository.save(injury);

        return injury;
    }



}
