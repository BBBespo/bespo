package com.ssafy.bespo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Team {
    @Id @GeneratedValue
    @Column(name = "team_id")
    private Integer id;
    private String name;
    private String image;
    private String code;
}
