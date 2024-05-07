package com.ssafy.bespo.controller;

import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.EventDto;
import com.ssafy.bespo.service.EventService;
import java.time.Month;
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
@RequestMapping("api/events")
public class EventController {

    private final EventService eventService;

    // 일정 전체 조회하기
    @GetMapping
    public ResponseEntity<Message> readSchedule(){
        Message message = new Message("일정 전체 조회 성공", eventService.readAllEvent());
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 특정 월 일정 조회
    @GetMapping("/month")
    public ResponseEntity<Message> readMonthSchedule(@RequestParam("scheduleId") int scheduleId, @RequestParam("month")
        Month month){
        Message message = new Message(month + "월 일정 조회 성공", eventService.readMonthEvent(scheduleId, month));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    // 일정 등록하기
    @PostMapping
    public ResponseEntity<Message> registerSchedule(@RequestBody EventDto.createEventRequest request){
        Message message = new Message("일정 등록 성공", eventService.createEvent(request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
