package com.ssafy.bespo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Training {

    @Id @GeneratedValue
    private Integer id;

}
