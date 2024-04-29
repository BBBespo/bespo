package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.MemoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

public class TeamDto {

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    public static class CreateTeamRequest {
        private String name;
        private String image;

        public CreateTeamRequest(String name, String image){
            this.name = name;
            this.image = image;
        }

    }

    @Getter
    @Builder
    @Setter
    public static class CreateTeamReponse {
        private Integer teamId;
        private String name;
        private String image;
        private String code;
    }

    @Getter
    @Builder
    @Setter
    public static class generateTeamCodeResponse {
        private String code;
    }

}
