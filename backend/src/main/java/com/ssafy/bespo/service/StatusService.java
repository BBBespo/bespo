package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.StatusDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Status;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusRepository statusRepository;
    private final MemberRepository memberRepository;

    // 컨디션 등록하기
    public Status registerStatus(StatusDto.createStatusRequest request){

        Member member = memberRepository.findByMemberIdAndFlagFalse(request.getMemberId());
        if(member == null){
            throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        }

        Status status = Status.builder()
            .fatigue(request.getStatus().getFatigue())
            .stress(request.getStatus().getStress())
            .muscle(request.getStatus().getMuscle())
            .mood(request.getStatus().getMood())
            .member(member)
            .build();

        statusRepository.save(status);

        return status;
    }

}
