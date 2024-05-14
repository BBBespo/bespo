package com.ssafy.bespo.controller;


import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.MemoDto;
import com.ssafy.bespo.service.MemoService;
import com.ssafy.bespo.service.S3UploaderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/api/memos")
public class MemoController {

    private final MemoService memoService;
    private final S3UploaderService s3UploaderService;
    @GetMapping
    public ResponseEntity<Message> readMemo(@RequestParam int memoId, @RequestHeader String accessToken) {
        Message message = new Message("메모 조회 성공", memoService.getPlayerMemo(memoId, accessToken));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Message> writeMemo(@RequestHeader String accessToken, @RequestPart MemoDto.writeMemoRequest request, @RequestPart(required = false) MultipartFile image) throws IOException {
        String imgUrl = s3UploaderService.upload(image, "memo");
        Message message = new Message("메모 작성 성공", memoService.registerMemo(accessToken, request, imgUrl));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }



}
