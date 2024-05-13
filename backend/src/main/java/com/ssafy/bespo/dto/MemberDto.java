package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDto {

        private Integer id;
        private String nickname;
        private Boolean createdNow;

        public static UserDto toUserDto(Member member){
            return UserDto.builder()
                    .id(member.getMemberId())
                    .nickname(member.getName())
                    .build();
        }
    }

}
