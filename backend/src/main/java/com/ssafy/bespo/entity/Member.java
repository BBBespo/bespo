package com.ssafy.bespo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.bespo.Enum.OAuthProvider;
import com.ssafy.bespo.Enum.RoleType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.script.ScriptEngine;
import java.util.List;
import lombok.NoArgsConstructor;

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
    @Nullable
    private Integer weight;
    @Nullable
    private Integer height;
    @Nullable
    private int birth;
    @Nullable
    private String tel;
    @Column(name = "back_number")
    @Nullable
    private Integer backNumber;

    @ManyToOne
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private Team team;

    @OneToMany(mappedBy = "member")
    private List<Status> statuses;

    @OneToMany(mappedBy = "member")
    private List<Training> trainings;

    @OneToMany(mappedBy = "member")
    private List<InjuryInfo> injuryInfos;

    @OneToMany(mappedBy = "member")
    private List<Memo> memos;

    private OAuthProvider oAuthProvider;

    public void addTeam(Team team){
        this.team = team;
    }

    public void updateRoleType(RoleType roleType){
        this.role = roleType;
    }

    @Builder
    public Member(String email, String nickname, OAuthProvider oAuthProvider) {
        this.email = email;
        this.name = nickname;
        this.oAuthProvider = oAuthProvider;
    }

    @Builder
    public void updateMember(String email, String name, RoleType role,
                               int weight, int height, int birth, int backNumber){
        this.email = email;
        this.name = name;
        this.role = role;
        this.weight = weight;
        this.height = height;
        this.birth = birth;
        this.backNumber = backNumber;
    }

}
