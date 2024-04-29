package com.ssafy.bespo.entity;


import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Status extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "status_id")
    private Integer statusId;

    private int fatigue;

    private int stress;

    private int muscle;

    private int mood;

    private int sleep;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
