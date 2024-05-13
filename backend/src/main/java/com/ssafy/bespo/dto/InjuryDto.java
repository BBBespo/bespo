package com.ssafy.bespo.dto;

import com.ssafy.bespo.entity.Injury;
import jakarta.persistence.Column;
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
        private Integer memberId;
        private readInjuryRequest injury;
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
    public static class createInjuryResponse{
        private String injuryArea;
        private Integer injuryLevel;
        private String injuryCause;
        private boolean isContact;
    }

}
