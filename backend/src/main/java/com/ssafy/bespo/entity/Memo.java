package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.Enum.RoleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
