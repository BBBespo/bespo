package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.InjuryDto;
import com.ssafy.bespo.dto.InjuryDto.createInjuryRequest;
import com.ssafy.bespo.dto.InjuryDto.readInjuryPlayerResponse;
import com.ssafy.bespo.entity.Injury;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.InjuryRepository;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.TeamRepository;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class InjuryService {

    private final InjuryRepository injuryRepository;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final AuthTokensGenerator authTokensGenerator;

    // 부상 정보 등록
    public Injury registerInjury(String accessToken, InjuryDto.createInjuryRequest request){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
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

    // 대시보드 부상 선수 리스트 조회
    // 부상 당한 날짜순으로
    public List<InjuryDto.readInjuryPlayerResponse> readPlayerList(int teamId){
        Team team = teamRepository.findByTeamIdAndFlagFalse(teamId);
        List<Member> members = team.getMembers();

        List<InjuryDto.readInjuryPlayerResponse> response = new ArrayList<>();
        for(Member m : members){
            List<Injury> injuries = m.getInjurys();
            if(!injuries.isEmpty()){
               Timestamp timestamp = injuryRepository.findByMemberIdOrderByDateDesc(m.getMemberId());
                LocalDateTime localDateTime = timestamp.toLocalDateTime();
                InjuryDto.readInjuryPlayerResponse res= InjuryDto.readInjuryPlayerResponse.builder()
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
