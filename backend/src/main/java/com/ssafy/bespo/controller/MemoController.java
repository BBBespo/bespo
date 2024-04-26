package com.ssafy.bespo.controller;


import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.controller.constants.Message;
import com.ssafy.bespo.service.MemoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/memos")
public class MemoController {

    private final MemoService memoService;

    @GetMapping
    public ResponseEntity<Message> readMemo(@RequestParam("type") MemoType type, @RequestParam("memberId") int memberId) {
        Message message = new Message("메모 조회 성공", memoService.getPlayerMemos(memberId, type));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
