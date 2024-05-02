package com.ssafy.bespo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Team extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "team_id")
    private Integer teamId;
    private String name;
    private String image;

    private String code;

    @OneToMany(mappedBy = "team")
    private List<Member> members;

    @OneToMany(mappedBy = "team")
    private List<Notification> notifications;

    @OneToMany(mappedBy = "team")
    private List<Memo> memos;


    @Builder
    public Team(String name, String image, String code){
        this.name = name;
        this.image = image;
        this.code = code;
    }
}
