package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.MemberDto;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.service.TeamService;
import java.util.concurrent.locks.ReentrantLock;
import javax.swing.event.HyperlinkEvent;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    // 팀 상세 조회하기
    @GetMapping
    public ResponseEntity<Message> readTeam(@RequestParam("teamId") int teamId){
        Message message = new Message("팀 상세 조회 성공", teamService.readTeam(teamId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 생성하기
    @PostMapping
    public ResponseEntity<Message> createTeam(@RequestBody TeamDto.CreateTeamRequest createTeamRequest){

        Message message;

        if(teamService.checkName(createTeamRequest.getName())){
            message = new Message("팀 이름 중복");
        } else{
            message = new Message("팀 생성 완료", teamService.createTeam(createTeamRequest));
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
    public ResponseEntity<Message> sendJoinTeam(@RequestBody TeamDto.sendJoinTeamRequest sendJoinTeamRequest){
        Message message;
        if (teamService.checkAlarm(sendJoinTeamRequest.getEmail())){
            message = new Message("팀 참가 요청 중복");
        } else {
            message = new Message("팀 참가 요청 완료", teamService.sendJoinTeam(sendJoinTeamRequest));
        }
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팀 참가 수락하기
    @PostMapping("/accept")
    public ResponseEntity<Message> acceptTeam(@RequestBody TeamDto.acceptRequest acceptRequest){
        Message message = new Message(teamService.acceptTeam(acceptRequest));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/testMember")
    public ResponseEntity<Message> registerMemberTest(@RequestBody MemberDto.readMemberRequest readMemberRequest){
        teamService.registerMember(readMemberRequest);
        Message message = new Message("테스트 회원 추가 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
