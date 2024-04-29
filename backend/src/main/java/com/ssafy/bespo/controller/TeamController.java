package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.service.TeamService;
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

}
