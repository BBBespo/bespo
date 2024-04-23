package com.ssafy.bespo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class InjuryInfo {

    @Id @GeneratedValue
    private Integer id;

    @Column(name = "injury_area")
    private String injuryArea;

    @Column(name = "injury_level")
    private Integer injuryLevel;

    @Column(name = "injury_cause")
    private String injuryCause;

    @Column(name = "is_contact")
    private boolean isContact;
}
