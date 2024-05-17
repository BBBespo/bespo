package com.ssafy.bespo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.dto.MemoDto;
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

    private String scope;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "memo")
    private List<Comment> comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "team_id")
    private Team team;

    public MemoDto.readMemosResponse toReadMemosResponse() {
        MemoDto.readMemosResponse response = MemoDto.readMemosResponse.builder()
                .memoId(this.memoId)
                .name(this.name)
                .content(this.content)
                .type(this.type)
                .scope(this.scope)
                .writerName(member.getName())
                .writerImgUrl(member.getImgUrl())
                .createdAt(this.getCreatedDate())
                .commentSize(this.getComments().size())
                .build();
        return response;
    }

}
