package com.ssafy.bespo.controller;


import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.dto.CommentDto;
import com.ssafy.bespo.dto.MemoDto;
import com.ssafy.bespo.repository.MemoRepository;
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
    private final MemoRepository memoRepository;

    @GetMapping("{memoId}")
    public ResponseEntity<Message> readMemo(@PathVariable int memoId, @RequestHeader String accessToken) {
        Message message = new Message("메모 조회 성공", memoService.getPlayerMemo(memoId, accessToken));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Message> writeMemo(@RequestHeader String accessToken, @RequestBody MemoDto.writeMemoRequest request) {
        Message message = new Message("메모 작성 성공", memoService.registerMemo(accessToken, request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Message> readMemos(@RequestHeader String accessToken, @RequestParam MemoType memoType) {
        Message message = new Message("메모 목록 조회 완료", memoService.readMemos(accessToken, memoType));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/comment")
    public ResponseEntity<Message> writeComment(@RequestHeader String accessToken, @RequestBody CommentDto.WriteComment request) {
        Message message = new Message("댓글 작성 완료", memoService.registerComment(accessToken, request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Message> deleteMemo(@RequestHeader String accessToken, @RequestHeader int memoId){
        memoService.deleteMemo(accessToken, memoId);
        Message message = new Message("메모 삭제 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
