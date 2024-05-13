package com.ssafy.bespo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
public class Injury extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "injury_info_id")
    private Integer injuryId;

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
    @JsonIgnore
    private Member member;

}
