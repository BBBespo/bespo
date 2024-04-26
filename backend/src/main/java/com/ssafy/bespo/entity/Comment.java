package com.ssafy.bespo.entity;

import jakarta.persistence.*;

@Entity
public class Comment extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "comment_id")
    private Integer commentId;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memo_id")
    private Memo memo;

}
