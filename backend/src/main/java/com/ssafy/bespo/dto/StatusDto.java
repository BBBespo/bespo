package com.ssafy.bespo.dto;

import com.ssafy.bespo.dto.InjuryDto.readInjuryRequest;
import java.time.LocalDateTime;
import java.time.Month;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class StatusDto {

    @Getter
    @Setter
    public static class createStatusRequest{
        private Integer memberId;
        private readStatusRequest status;
    }

    @Getter
    @Setter
    public static class readStatusRequest{
        private int fatigue;
        private int stress;
        private int muscle;
        private int mood;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readStatusPlayerResponse{
        private String name;
        private LocalDateTime createDate;
        private int year;
        private Month month;
        private int day;
        private int hour;
    }

}
