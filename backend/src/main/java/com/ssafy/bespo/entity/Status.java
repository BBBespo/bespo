package com.ssafy.bespo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @JsonIgnore
    private Member member;

}
