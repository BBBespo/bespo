package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.AcceptType;
import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.entity.Alarm;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.entity.Notification;
import jakarta.persistence.OneToMany;
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
    public static class sendJoinTeamRequest {
        private String code;
        private Integer memberId;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class sendJoinTeamResponse {
       private Integer memberId;
       private String name;
    }

    @Getter
    @Builder
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class acceptRequest {
        private String code;
        private Integer memberId;
        private AlarmDto.readAlarmResponse alarmResponse;
    }

}
