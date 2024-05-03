package com.ssafy.bespo.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Training extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "training_id")
    private Integer trainingId;

    private Integer bpm;

    private double distance;

    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
