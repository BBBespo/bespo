package com.ssafy.bespo.entity;


import jakarta.persistence.*;

@Entity
public class Condition extends BaseTime {

    @Id
    @Column(name = "condition_id")
    @GeneratedValue
    private Integer conditionId;

    private int fatigue;

    private int stress;

    private int muscle;

    private int mood;

    private int sleep;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
