package com.ssafy.bespo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.bespo.Enum.OAuthProvider;
import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.dto.MemberDto;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.script.ScriptEngine;
import java.util.List;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseTime {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    private String email;
    private String name;
    private RoleType role;
    @Builder.Default
    private Integer weight = 0;
    @Builder.Default
    private Integer height = 0;
    @Nullable
    private String birth;
    @Nullable
    private String tel;

    @Column(name = "back_number")
    @Builder.Default
    private Integer backNumber = 0;

    @Builder.Default
    private String imgUrl = "https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG";

    @ManyToOne
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private Team team;

    @OneToMany(mappedBy = "member")
    private List<Status> statuses;

    @OneToMany(mappedBy = "member")
    private List<Training> trainings;

    @OneToMany(mappedBy = "member")
    private List<Injury> injurys;

    @OneToMany(mappedBy = "member")
    private List<Memo> memos;

    private OAuthProvider oAuthProvider;

    public void addTeam(Team team){
        this.team = team;
    }

    public void updateRoleType(RoleType roleType){
        this.role = roleType;
    }

    public Member(String email, String nickname, OAuthProvider oAuthProvider) {
        this.email = email;
        this.name = nickname;
        this.oAuthProvider = oAuthProvider;
    }

    public void updateMember(String name, RoleType role,
                               int weight, int height, String birth, int backNumber, String imgUrl, String tel){
        this.name = name;
        this.role = role;
        this.weight = weight;
        this.height = height;
        this.birth = birth;
        this.backNumber = backNumber;
        this.imgUrl = imgUrl;
        this.tel = tel;
    }

    public MemberDto.readMemberResponse toReadMemberResponse(){
        MemberDto.readMemberResponse response = MemberDto.readMemberResponse.builder()
                .email(this.email)
                .name(this.name)
                .role(this.role)
                .weight(this.weight)
                .height(this.height)
                .birth(this.birth)
                .backNumber(this.backNumber)
                .imgUrl(this.imgUrl)
                .tel(this.tel)
                .memberId(this.memberId)
                .build();
        return response;
    }
}
