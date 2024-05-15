package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.InjuryDto;
import com.ssafy.bespo.dto.StatusDto;
import com.ssafy.bespo.dto.StatusDto.createStatusRequest;
import com.ssafy.bespo.service.InjuryService;
import com.ssafy.bespo.service.StatusService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/status")
public class StatusController {

    private final StatusService statusService;

    // 부상 정보 등록하기
    @PostMapping
    public ResponseEntity<Message> registerStatus(@RequestHeader String accessToken, @RequestBody StatusDto.createStatusRequest request){
        Message message = new Message("컨디션 정보 등록 완료", statusService.registerStatus(accessToken, request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 대시보드 컨디션 선수 리스트 조회
    @GetMapping
    public ResponseEntity<Message> readStatus(@RequestParam("teamId") int teamId){
        Message message = new Message("대시보드 컨디션 관리가 필요한 선수 리스트 조회 완료", statusService.readPlayerList(teamId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
