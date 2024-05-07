package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.ScheduleType;
import com.ssafy.bespo.entity.Member;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

public class ScheduleDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class createScheduleRequest{
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime start;
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime end;
        private String title;
        private String content;
        private ScheduleType type;
        private String location;
        private List<String> attendees;
    }

    @Getter
    @Setter
    @Builder
    public static class createScheduleResponse{
        private Integer scheduleId;
        private LocalDateTime start;
        private LocalDateTime end;
        private String name;
        private ScheduleType type;
        private String location;
        private List<String> attendees;
    }


}
