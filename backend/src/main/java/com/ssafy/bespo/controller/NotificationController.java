package com.ssafy.bespo.controller;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.NotificationDto;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.service.NotificationService;
import com.ssafy.bespo.service.S3UploaderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notices")
public class NotificationController {

    private final NotificationService notificationService;
    private final S3UploaderService s3UploaderService;

    @GetMapping
    public ResponseEntity<Message> readNotifications(@RequestHeader String accessToken) {
        Message message = new Message("공지 목록 조회 성공", notificationService.getNotificationList(accessToken));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/{notificationId}")
    public ResponseEntity<Message> readNotification(@RequestHeader String accessToken, @PathVariable int notificationId){
        Message message = new Message("공지 조회 성공", notificationService.getNotification(accessToken, notificationId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Message> registerNotification(@RequestHeader String accessToken, @RequestPart(required = false) MultipartFile image, @RequestPart NotificationDto.writeNotificationRequest request) throws IOException {
        String url = "";
        if(image != null)
            url = s3UploaderService.upload(image, "notification");

        int notificationId = notificationService.writeNotification(accessToken, url, request);
        Message message = new Message("공지 등록 성공", notificationId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Message> updateNotification(@RequestHeader String accessToken, @RequestPart(required = false) MultipartFile image, @RequestPart NotificationDto.modifyNotificationRequest request) throws IOException {
        String url = "";
        if(image != null) url = s3UploaderService.upload(image, "notification");
        int notificationId = notificationService.modifyNotification(accessToken, url, request);
        Message message = new Message("공지 수정 성공", notificationId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteNotification(@RequestHeader String accessToken, @RequestHeader int notificationId) {
        notificationService.deleteNotification(accessToken, notificationId);
        Message message = new Message("공지 삭제 성공");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
