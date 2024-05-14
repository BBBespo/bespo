package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.InjuryDto;
import com.ssafy.bespo.dto.StatusDto;
import com.ssafy.bespo.service.InjuryService;
import com.ssafy.bespo.service.StatusService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/status")
public class StatusController {

    private final StatusService statusService;

    // 부상 정보 등록하기
    @PostMapping
    public ResponseEntity<Message> registerStatus(@RequestBody StatusDto.createStatusRequest request){
        Message message = new Message("컨디션 정보 등록 완료", statusService.registerStatus(request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
