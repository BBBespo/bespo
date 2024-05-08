package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.MemoType;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public class Memo extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "memo_id")
    private Integer memoId;

    private String name;
    private String content;

    private MemoType type;

    private String image;

    private String scope;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "memo")
    private List<Comment> comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

}