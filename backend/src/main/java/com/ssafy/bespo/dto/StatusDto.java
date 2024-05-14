package com.ssafy.bespo.dto;

import com.ssafy.bespo.dto.InjuryDto.readInjuryRequest;
import lombok.Getter;
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

}
