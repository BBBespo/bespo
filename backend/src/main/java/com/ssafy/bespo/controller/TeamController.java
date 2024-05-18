package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.MemberDto;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.dto.TeamDto.acceptRequest;
import com.ssafy.bespo.dto.TeamDto.sendJoinTeamRequest;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.service.S3UploaderService;
import com.ssafy.bespo.service.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.concurrent.locks.ReentrantLock;
import javax.swing.event.HyperlinkEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;
    private final AuthTokensGenerator authTokensGenerator;
    private final S3UploaderService s3UploaderService;

    // 팀 상세 조회하기
    @GetMapping
    public ResponseEntity<Message> readTeam(@RequestHeader String accessToken, @RequestParam("teamId") int teamId){
        Message message = new Message("팀 상세 조회 성공", teamService.readTeam(accessToken, teamId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 생성하기
    @PostMapping
    public ResponseEntity<Message> createTeam(@RequestHeader String accessToken, @RequestPart TeamDto.CreateTeamRequest request, @RequestPart MultipartFile image) throws IOException {
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        String imgUrl;
        if(image == null)
            imgUrl = "https://bespo.s3.ap-northeast-2.amazonaws.com/default/team.PNG";
        imgUrl = s3UploaderService.upload(image, "team");
        Message message;

        if(teamService.checkName(request.getName())){
            throw new CustomException(ErrorCode.WRONG_TEAM_NAME);
        } else{
            message = new Message("팀 생성 완료", teamService.createTeam(request, imgUrl, memberId));
        }

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 코드 생성하기
    @PostMapping("/invite-code")
    public ResponseEntity<Message> generateTeamCode(@RequestParam Integer teamId){
        Message message = new Message("팀 코드 생성 완료", teamService.generateTeamInviteCode(teamId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 참가요청 보내기
    @PostMapping("/send")
    public ResponseEntity<Message> sendJoinTeam(@RequestHeader String accessToken, @RequestBody TeamDto.sendJoinTeamRequest sendJoinTeamRequest){
        Message message;
        if (teamService.checkAlarm(sendJoinTeamRequest.getEmail())){
            throw new CustomException(ErrorCode.WRONG_TEAM_NAME);
        } else {
            message = new Message("팀 참가 요청 완료", teamService.sendJoinTeam(accessToken, sendJoinTeamRequest));
        }
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/accept")
    public ResponseEntity<Message> acceptTeam(@RequestHeader String accessToken){
        Message message = new Message("팀 참가 대기 목록 조회 성공", teamService.readAlarmList(accessToken));
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    // 팀 참가 수락하기
    @PostMapping("/accept")
    public ResponseEntity<Message> acceptTeam(@RequestHeader String accessToken, @RequestParam int alarmId){
        teamService.acceptTeam(accessToken, alarmId);
        Message message = new Message("팀 참가 요청이 수락되었습니다.");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/testMember")
    public ResponseEntity<Message> registerMemberTest(@RequestBody MemberDto.readMemberRequest readMemberRequest){
        teamService.registerMember(readMemberRequest);
        Message message = new Message("테스트 회원 추가 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 선수단 정보 api, 팀명,생성일, 팀원수, 이미지
    @GetMapping("/info")
    public ResponseEntity<Message> readTeamInfo(@RequestParam("teamId") int teamId){
        Message message = new Message("팀 선수단 정보 조회 성공", teamService.readInfoTeam(teamId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 선수 리스트 조회
    @GetMapping("/players")
    public ResponseEntity<Message> readPlayers(@RequestParam("teamId") int teamId){
        Message message = new Message("팀 선수단 리스트 조회 성공", teamService.getPlayers(teamId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 프로필 이미지 업로드
    @PostMapping(value="/upload",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Message> uploadImage(@RequestPart(value="image", required = false) MultipartFile image, @RequestPart TeamDto.uploadImageRequest request) throws IOException {
        Message message = new Message(("팀 이미지 업로드 성공"), teamService.uploadImage(image, request.getTeamId()));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Message> outTeam(@RequestHeader String accessToken, @RequestHeader int teamId){
        teamService.outTeam(accessToken, teamId);
        Message message = new Message("팀 나가기 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
