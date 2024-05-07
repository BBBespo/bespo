package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.EventType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

public class EventDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class createEventRequest{
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime start;
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime end;
        private String title;
        private String content;
        private EventType type;
        private String location;
        private List<String> attendees;
    }

    @Getter
    @Setter
    @Builder
    public static class createEventResponse{
        private Integer eventId;
        private LocalDateTime start;
        private LocalDateTime end;
        private String name;
        private EventType type;
        private String location;
        private List<String> attendees;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readYearMonthEventResponse{
        private Integer eventId;
        private LocalDateTime start;
        private LocalDateTime end;
        private String name;
        private EventType type;
        private String location;
        private List<String> attendees;
    }


}
