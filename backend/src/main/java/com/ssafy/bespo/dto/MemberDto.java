package com.ssafy.bespo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.entity.*;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class MemberDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readMemberRequest{
        private Integer memberId;
        private String email;
        private String name;
        private RoleType role;
        private Integer weight;
        private Integer height;
        private String birth;
        private String tel;
        private Integer backNumber;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readMemberResponse{
        private Integer memberId;
        private String email;
        private String name;
        private RoleType role;
        private Integer weight;
        private Integer height;
        private String birth;
        private String tel;
        private Integer backNumber;
        private TeamDto.ReadTeam team;
        private String imgUrl;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateMemberRequest {

        private String email;
        private String name;
        private RoleType role;
        private Integer weight;
        private Integer height;
        private String birth;
        private String tel;
        private Integer backNumber;

    }

//    @Getter
//    @Setter
//    @Builder
//    @NoArgsConstructor
//    @AllArgsConstructor
//    public static class RegisterMemberRequest {
//
//    }

}
