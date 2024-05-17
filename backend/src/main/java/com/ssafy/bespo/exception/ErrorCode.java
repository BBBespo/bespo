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
    NO_AUTHENTICATION(401, "권한이 없습니다."),
    WRONG_CODE(401, "카카오 로그인 코드가 잘못되었습니다."),
    No_EXIST_EVENT(400, "해당하는 일정이 없습니다."),
    No_EXIST_IMAGE(400, "해당하는 이미지가 없습니다."),
    NO_AUTHENTICATION_FOR_NOTIFICATION(401, "공지사항 권한이 없습니다."),
    NO_EXIST_NOTIFICATION(400, "조회한 공지사항 항목이 없습니다."),
    NO_AUTHENTICATION_DIFFERENT_WRITER(401, "수정 및 삭제 권한이 없습니다. 작성자와 수정자가 다릅니다."),
    NO_EXIST_MEMO(401, "해당하는 메모가 없습니다."),
    NO_AUTHENTICATION_FOR_EVENT(401, "일정조회 권한이 없습니다."),
    NO_AUTHENTICATION_FOR_TEAM(401, "팀조회 권한이 없습니다."),
    WRONG_TEAM_NAME(401,"팀 참가 요청 중복")
    ;

    private final int status;
    private final String message;
}
