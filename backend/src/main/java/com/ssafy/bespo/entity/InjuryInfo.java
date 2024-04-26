package com.ssafy.bespo.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class InjuryInfo extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "injury_info_id")
    private Integer injuryInfoId;

    @Column(name = "injury_area")
    private String injuryArea;

    @Column(name = "injury_level")
    private Integer injuryLevel;

    @Column(name = "injury_cause")
    private String injuryCause;

    @Column(name = "is_contact")
    private boolean isContact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
