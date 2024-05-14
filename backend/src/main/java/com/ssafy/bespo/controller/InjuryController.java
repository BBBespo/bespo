package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.InjuryDto;
import com.ssafy.bespo.repository.TeamRepository;
import com.ssafy.bespo.service.InjuryService;
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
@RequestMapping("/api/injury")
public class InjuryController {

    private final InjuryService injuryService;

    // 부상 정보 등록하기
    @PostMapping
    public ResponseEntity<Message> registerInjury(@RequestBody InjuryDto.createInjuryRequest request){
        Message message = new Message("부상 정보 등록 완료", injuryService.registerInjury(request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 대시보드 부상 선수 리스트 조회
    @GetMapping
    public ResponseEntity<Message> readInjury(@RequestParam("teamId") int teamId){
        Message message = new Message("대시보드 부상 선수 리스트 조회 완료", injuryService.readPlayerList(teamId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
