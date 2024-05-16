package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.AcceptType;
import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.entity.*;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
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
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readTeamResponse{
        private Integer teamId;
        private String name;
        private String image;
        private String code;

        private List<Member> memberList;
        private AlarmDto.readAlarmResponse alarmList;

    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadTeam{
        private Integer teamId;
        private String name;
        private String image;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTeamRequest {
        private String name;
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
    public static class sendJoinTeamRequest {
        private String code;
        private String email;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class sendJoinTeamResponse {
       private Integer memberId;
       private String email;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class acceptRequest {
        private String code;
        private int memberId;
        private AcceptType acceptType;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class infoTeamResponse {
        private String name;
        private LocalDateTime createDate;
        private int playerCount;
        private String image;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class playerInfoResponse {
        private int memberId;
        private String name;
        private RoleType roleType;
        private int number;
    }

    @Getter
    @Setter
    public static class uploadImageRequest{
        private int teamId;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class uploadImageResponse{
        private String image;
    }

}
