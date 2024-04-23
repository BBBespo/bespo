package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.MemoType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Memo {

    @Id @GeneratedValue
    private Integer id;

    private String name;
    private String content;

    private MemoType type;

    private String image;

    private String scope;

}
