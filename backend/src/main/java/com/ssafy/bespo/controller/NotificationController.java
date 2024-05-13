package com.ssafy.bespo.controller;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.controller.constants.Message;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notices")
public class NotificationController {


    @GetMapping
    public ResponseEntity<Message> readNotification() {
        Message message = new Message("공지 조회 성공");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Message> registerNotification() {
        Message message = new Message("공지 등록 성공");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Message> updateNotification() {
        Message message = new Message("공지 수정 성공");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteNotification() {
        Message message = new Message("공지 삭제 성공");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
