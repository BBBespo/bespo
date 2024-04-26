package com.ssafy.bespo.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity
public class Team extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "team_id")
    private Integer teamId;
    private String name;
    private String image;

    private String code;

    @OneToMany(mappedBy = "team")
    private List<Member> members;

    @OneToMany(mappedBy = "team")
    private List<Notification> notifications;

}
