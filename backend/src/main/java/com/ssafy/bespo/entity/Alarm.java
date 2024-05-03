package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.AcceptType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;

@Entity
@Builder
public class Alarm {

    @Id @GeneratedValue
    private Integer alarmId;

    private String content;
    private boolean is_read;
    private AcceptType acceptType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

}
