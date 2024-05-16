package com.ssafy.bespo.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class TrainingDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class writeTrainingRequest{
        private Integer bpm;

        private double distance;

        private String time;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readTrainingResponse{
        private Integer bpm;

        private double distance;

        private String time;
    }

}
