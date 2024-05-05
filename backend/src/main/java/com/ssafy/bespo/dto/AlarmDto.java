package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.AcceptType;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class AlarmDto { // 팀가입 요청 알림 리스트

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readAlarmResponse {
        private Integer alarmId;
        private String content;
        private boolean is_read;
        private AcceptType acceptType;
    }

}
