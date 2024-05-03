package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.entity.Member;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;


public class TeamDto {

    @Getter
    @Setter
    public static class TeamDtoReq{

    }

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
        private List<Member> members;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class generateTeamCodeRequest {
        private String code;
    }

    @Getter
    @Builder
    @Setter
    public static class generateTeamCodeResponse {
        private String code;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class sendJoinTeamReq {
        private String code;
        private MemberDto.readMemberRequest readMemberRequest;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class sendJoinTeamRes {
       private MemberDto.readMemberRequest readMemberRequest;
    }

}
