package com.ssafy.bespo.service;

import com.ssafy.bespo.Enum.AcceptType;
import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.dto.MemberDto;
import com.ssafy.bespo.dto.MemberDto.readMemberRequest;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.dto.TeamDto.acceptRequest;
import com.ssafy.bespo.dto.TeamDto.sendJoinTeamRequest;
import com.ssafy.bespo.dto.TeamDto.uploadImageResponse;
import com.ssafy.bespo.entity.Alarm;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.AlarmRepository;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.TeamRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    private final MemberRepository memberRepository;

    private final AlarmRepository alarmRepository;
    private final AuthTokensGenerator authTokensGenerator;

    @Autowired
    private S3UploaderService s3UploaderService;

    // 팀 상세 조회하기
    public TeamDto.readTeamInfoResponse readTeam(String accessToken, int teamId){
        Team team = teamRepository.findByTeamIdAndFlagFalse(teamId);

        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);

        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }

        if(member.getTeam() != team) throw new CustomException(ErrorCode.NO_AUTHENTICATION_FOR_EVENT);

        TeamDto.readTeamInfoResponse response = TeamDto.readTeamInfoResponse.builder()
            .createdDate(team.getCreatedDate())
            .modifiedDate(team.getModifiedDate())
            .teamId(team.getTeamId())
            .name(team.getName())
            .image(team.getImage())
            .code(team.getCode())
            .members(team.getMembers())
            .build();

        return response;
    }

    // 팀 생성하기
    public Team createTeam(TeamDto.CreateTeamRequest teamDtoReq, String imgUrl, int memberId){

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

        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member.getTeam() != null){

        }
        member.updateRoleType(RoleType.Manager);

        if(imgUrl.equals(""))
            imgUrl = "https://bespo.s3.ap-northeast-2.amazonaws.com/default/team.PNG";

        // 팀 생성
        Team team = Team.builder()
            .name(teamDtoReq.getName())
            .image(imgUrl)
            .code(randomCode)
            .build();

        team.addMember(member);
        teamRepository.save(team);
        member.addTeam(team);
        memberRepository.save(member);

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
        return generateTeamCodeResponse;
    }

    // 팀 이름 중복 체크
    public boolean checkName(String name){
        return teamRepository.existsByNameAndFlagFalse(name);
    }

    public boolean checkAlarm(String email){
        return alarmRepository.existsByEmailAndFlagFalse(email);
    }

    // 팀 코드를 입력하여 관리자에게 승인 요청 보내기
    public TeamDto.sendJoinTeamResponse sendJoinTeam(String accessToken, TeamDto.sendJoinTeamRequest sendJoinTeamReq){

        // 코드를 통해 팀 찾기
        Team team = teamRepository.findByCodeAndFlagFalse(sendJoinTeamReq.getCode());
        // 가입할 사람의 정보
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
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
    public String acceptTeam(String accessToken, TeamDto.acceptRequest acceptRequest){
        String msg = "";
        Team team = teamRepository.findByCodeAndFlagFalse(acceptRequest.getCode());
        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }
//        int memberId = authTokensGenerator.extractMemberId(accessToken);
        
        Member member = memberRepository.findByMemberIdAndFlagFalse(acceptRequest.getMemberId());
        if(member == null){
            throw new CustomException((ErrorCode.NO_EXIST_MEMBER));
        }
        Alarm alarm = alarmRepository.findByEmailAndFlagFalse(member.getEmail());
        if(alarm == null){
            throw new CustomException(ErrorCode.No_EXIST_ALARM);
        }
        if(AcceptType.COMPLETE.equals(acceptRequest.getAcceptType())){ // 수락완료
            msg = "요청 수락완료";
            // 요청 리스트에서 제거
            team.removeAlarm(alarm);
            alarmRepository.delete(alarm);
            // 팀에 멤버 추가시 권한 Player
            member.updateRoleType(RoleType.Player);
            team.addMember(member);
            teamRepository.save(team);
            // 멤버에 팀 추가
            member.addTeam(team);
            memberRepository.save(member);

        } else if(AcceptType.REFUSE.equals(acceptRequest.getAcceptType())){ // 수락 거절
            msg = "요청 거절";
            // 요청리스트에서 제거
            alarmRepository.delete(alarm);
        } else{ // 수락대기, 수락 요청,
            msg = "수락 대기중";
        }
        return msg;
    }

    public Team findByCode(String code){
        return teamRepository.findByCodeAndFlagFalse(code);
    }

    public void registerMember(MemberDto.readMemberRequest readMemberRequest){
        Member member = Member.builder()
            .email(readMemberRequest.getEmail())
            .name(readMemberRequest.getName())
            .build();

        memberRepository.save(member);
    }

    // 팀 선수단 정보
    public TeamDto.infoTeamResponse readInfoTeam(int teamId){
        Team team = teamRepository.findByTeamIdAndFlagFalse(teamId);
        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }
        int playerCount = team.getMembers().size();

        TeamDto.infoTeamResponse response = TeamDto.infoTeamResponse.builder()
            .name(team.getName())
            .image(team.getImage())
            .playerCount(playerCount)
            .createDate(team.getCreateDate())
            .build();

        return response;
    }

    // 팀 선수단 리스트 조회
    public List<TeamDto.playerInfoResponse> getPlayers(int teamId){
        Team team = teamRepository.findByTeamIdAndFlagFalse(teamId);
        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }

        List<Member> memberList = team.getMembers();
        List<TeamDto.playerInfoResponse> playerList = new ArrayList<>();

        for(Member member : memberList){
            int backNumber = 0;
            if(member.getBackNumber() == null){
                backNumber = 0;
            } else{
                backNumber = member.getBackNumber();
            }
            TeamDto.playerInfoResponse response = TeamDto.playerInfoResponse.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .roleType(member.getRole())
                .number(backNumber)
                .build();

            playerList.add(response);
        }

        return playerList;
    }

    @Transactional
    public TeamDto.uploadImageResponse uploadImage(MultipartFile image, int teamId) throws IOException {
        Team team = teamRepository.findByTeamIdAndFlagFalse(teamId);
        if(team == null){
            throw new CustomException(ErrorCode.No_EXIST_TEAM);
        }

        TeamDto.uploadImageResponse uploadImageResponse = new uploadImageResponse();

        if(!image.isEmpty()) {
            String storedFileName = s3UploaderService.upload(image,"teamImage");
            team.addImage(storedFileName);
            uploadImageResponse = TeamDto.uploadImageResponse.builder()
                .image(storedFileName)
                .build();
        }

        return uploadImageResponse;
    }

}
