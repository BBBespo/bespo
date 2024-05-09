package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.RoleType;
import jakarta.persistence.*;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "team")
    private List<Alarm> alarms = new ArrayList<>();

    public void addMember(Member member){
        if(this.members == null){
            this.members = new ArrayList<>();
            this.members.add(member);
        } else{
            this.members.add(member);
        }
    }

    public void addAlarm(Alarm alarm){
        this.alarms.add(alarm);
    }

    public void removeAlarm(Alarm alarm){
        this.alarms.remove(alarm);
    }

    public void addImage(String image){
        this.image = image;
    }
}
