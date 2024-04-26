package com.ssafy.bespo.entity;

import jakarta.persistence.*;

import javax.script.ScriptEngine;
import java.util.List;

@Entity
public class Member extends BaseTime {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    private String email;
    private String name;
//    private RoleType role;
    private Integer weight;
    private Integer height;
    private int birth;
    private String tel;
    @Column(name = "back_number")
    private Integer backNumber;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany(mappedBy = "member")
    private List<Condition> conditions;

    @OneToMany(mappedBy = "member")
    private List<Training> trainings;

    @OneToMany(mappedBy = "member")
    private List<InjuryInfo> injuryInfos;

    @OneToMany(mappedBy = "member")
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "member")
    private List<Memo> memos;

}
