package com.ssafy.bespo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Member {
    @Id @GeneratedValue
    private Integer Id;

    private String email;
    private String name;
//    private RoleType role;
    private Integer weight;
    private Integer height;
    private int birth;
    private String tel;
    @Column(name = "back_number")
    private Integer backNumber;

    @OneToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
