package com.ssafy.bespo.service;

import com.ssafy.bespo.Enum.AcceptType;
import com.ssafy.bespo.dto.AlarmDto;
import com.ssafy.bespo.dto.MemberDto;
import com.ssafy.bespo.dto.MemberDto.readMemberRequest;
import com.ssafy.bespo.dto.MemoDto;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.entity.Alarm;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.AlarmRepository;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.TeamRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    private final MemberRepository memberRepository;

    private final AlarmRepository alarmRepository;

    // 팀 상세 조회하기
    public Team readTeam(int teamId){
        Team team = teamRepository.findByTeamIdAndFlagFalse(teamId);

        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }

        return team;
    }

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

    public boolean checkAlarm(String email){
        return alarmRepository.existsByEmail(email);
    }

    // 팀 코드를 입력하여 관리자에게 승인 요청 보내기
    public TeamDto.sendJoinTeamResponse sendJoinTeam(TeamDto.sendJoinTeamRequest sendJoinTeamReq){

        // 코드를 통해 팀 찾기
        Team team = teamRepository.findByCode(sendJoinTeamReq.getCode());
        // 가입할 사람의 정보
        Member member = memberRepository.findByMemberIdAndFlagFalse(sendJoinTeamReq.getMemberId());
        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }
        if(member == null){
            throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        }

        TeamDto.sendJoinTeamResponse sendJoinTeamRes =TeamDto.sendJoinTeamResponse.builder()
            .memberId(member.getMemberId())
            .email(member.getEmail())
            .build();

        // 알림 리스트에 추가
        Alarm alarm = Alarm.builder()
            .email(member.getEmail())
            .is_read(false)
            .acceptType(AcceptType.REQUEST)
            .team(team)
            .build();

        team.addAlarm(alarm);
        alarmRepository.save(alarm);

        return sendJoinTeamRes;
    }

    // 팀 관리자가 팀에 멤버로 추가
    @Transactional
    public String acceptTeam(TeamDto.acceptRequest acceptRequest){
        String msg = "";
        Team team = teamRepository.findByCode(acceptRequest.getCode());
        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }
        Member member = memberRepository.findByMemberIdAndFlagFalse(acceptRequest.getMemberId());
        if(member == null){
            throw new CustomException((ErrorCode.NO_EXIST_MEMBER));
        }
        Alarm alarm = alarmRepository.findByEmail(member.getEmail());
        if(alarm == null){
            throw new CustomException(ErrorCode.No_EXIST_ALARM);
        }
        if(AcceptType.COMPLETE.equals(acceptRequest.getAcceptType())){ // 수락완료
            msg = "요청 수락완료";
            // 요청 리스트에서 제거
            team.removeAlarm(alarm);
            alarmRepository.delete(alarm);
            // 팀에 멤버 추가
            team.addMember(member);
            teamRepository.save(team);
            // 멤버에 팀 추가
            member.addTeam(team);
            memberRepository.save(member);

        } else if(acceptRequest.getAcceptType().equals("REFUSE")){ // 수락 거절
            msg = "요청 거절";
            // 요청리스트에서 제거
            alarmRepository.delete(alarm);
        } else{ // 수락대기, 수락 요청,
            msg = "수락 대기중";
        }
        return msg;
    }

    public Team findByCode(String code){
        return teamRepository.findByCode(code);
    }

    public void regitserMember(MemberDto.readMemberRequest readMemberRequest){
        Member member = Member.builder()
            .email(readMemberRequest.getEmail())
            .name(readMemberRequest.getName())
            .build();

        memberRepository.save(member);
    }

}
