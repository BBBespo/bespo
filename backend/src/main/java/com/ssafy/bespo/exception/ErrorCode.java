package com.ssafy.bespo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    NO_EXIST(400, "조회할 항목이 없습니다."),
    NO_EXIST_MEMBER(400, "해당하는 멤버가 없습니다."),
    No_EXIST_TEAM(400, "해당하는 팀이 없습니다."),
    No_EXIST_ALARM(400, "해당하는 알림이 없습니다."),
    No_EXIST_EVENT(400, "해당하는 일정이 없습니다."),
    No_EXIST_IMAGE(400, "해당하는 이미지가 없습니다.")
        ;

    private final int status;
    private final String message;
}
