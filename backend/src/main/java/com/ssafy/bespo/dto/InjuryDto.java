package com.ssafy.bespo.dto;

import com.ssafy.bespo.entity.Injury;
import jakarta.persistence.Column;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.Year;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class InjuryDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class createInjuryRequest{
        private readInjuryRequest injury;
    }

    @Getter
    @Setter
    public static class createInjuryResponse{
        private String injuryArea;
        private Integer injuryLevel;
        private String injuryCause;
        private boolean isContact;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readInjuryRequest{
        private String injuryArea;
        private Integer injuryLevel;
        private String injuryCause;
        private Boolean isContact;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readInjuryPlayerResponse{
        private String name;
        private LocalDateTime createDate;
        private int year;
        private Month month;
        private int day;
        private int hour;
    }


}
