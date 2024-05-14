package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.InjuryDto;
import com.ssafy.bespo.dto.InjuryDto.readInjuryPlayerResponse;
import com.ssafy.bespo.dto.StatusDto;
import com.ssafy.bespo.entity.Injury;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Status;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.StatusRepository;
import com.ssafy.bespo.repository.TeamRepository;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusRepository statusRepository;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;

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

    // 대시보드 컨디션 관리가 필요한 선수 리스트 조회
    // 컨디션 등록한 날짜순으로
    public List<StatusDto.readStatusPlayerResponse> readPlayerList(int teamId){
        Team team = teamRepository.findByTeamIdAndFlagFalse(teamId);
        List<Member> members = team.getMembers();

        List<StatusDto.readStatusPlayerResponse> response = new ArrayList<>();
        for(Member m : members){
            List<Status> statuses = m.getStatuses();
            if(!statuses.isEmpty()){
                Timestamp timestamp = statusRepository.findByMemberIdOrderByDateDesc(m.getMemberId());
                LocalDateTime localDateTime = timestamp.toLocalDateTime();
                StatusDto.readStatusPlayerResponse res= StatusDto.readStatusPlayerResponse.builder()
                    .name(m.getName())
                    .createDate(timestamp.toLocalDateTime())
                    .year(localDateTime.getYear())
                    .month(localDateTime.getMonth())
                    .day(localDateTime.getDayOfMonth())
                    .hour(localDateTime.getHour())
                    .build();
                response.add(res);
            }
        }

        return response;
    }

}
