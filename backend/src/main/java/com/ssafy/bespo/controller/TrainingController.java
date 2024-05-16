package com.ssafy.bespo.controller;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.StatusDto;
import com.ssafy.bespo.dto.TrainingDto;
import com.ssafy.bespo.service.MemoService;
import com.ssafy.bespo.service.TrainingService;
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
@RequestMapping("/api/training")
public class TrainingController {

    private final TrainingService trainingService;

    @PostMapping
    public ResponseEntity<Message> registerStatus(@RequestHeader String accessToken, @RequestBody TrainingDto.writeTrainingRequest request){
        Message message = new Message("운동 정보 등록 완료", trainingService.registerTraining(accessToken, request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Message> readTraingin(@RequestHeader String accessToken) {
        Message message = new Message("운동 기록 조회 완료", trainingService.readTraining(accessToken));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
