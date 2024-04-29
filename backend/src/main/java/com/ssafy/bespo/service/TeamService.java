package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.MemoDto;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.TeamRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    public Team createTeam(TeamDto.CreateTeamRequest teamDtoReq){

        // 팀 코드 생성
        int leftLimits = 48;
        int rightLimits = 122;
        int targetStringLength = 6;
        Random random = new Random();
        String randomCode = random.ints(leftLimits, rightLimits+1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();

        // 팀 생성
        Team team = Team.builder()
            .name(teamDtoReq.getName())
            .image(teamDtoReq.getImage())
            .code(randomCode)
            .build();

        teamRepository.save(team);

        return team;
    }

    // 팀 유효 여부 확인
    private Team validateExistTeam(Integer teamId) {
        return teamRepository.findById(teamId)
            .orElseThrow(() -> new CustomException(ErrorCode.No_EXIST_TEAM));
    }

    // 팀 코드 생성하기
    public TeamDto.generateTeamCodeResponse generateTeamInviteCode(Integer teamId) {
        validateExistTeam(teamId);

        int leftLimits = 48;
        int rightLimits = 122;
        int targetStringLength = 6;
        Random random = new Random();
        // 팀코드 생성
        String randomCode = random.ints(leftLimits, rightLimits+1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();

        TeamDto.generateTeamCodeResponse generateTeamCodeResponse = TeamDto.generateTeamCodeResponse.builder()
                .code(randomCode)
                .build();
        System.out.println(generateTeamCodeResponse.getCode());
        return generateTeamCodeResponse;
    }

    // 팀 이름 중복 체크
    public boolean checkName(String name){
        return teamRepository.existsByName(name);
    }

}
