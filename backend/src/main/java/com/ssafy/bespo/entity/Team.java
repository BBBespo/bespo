package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.dto.TeamDto;
import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;

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

    @Builder.Default
    private String image = "https://bespo.s3.ap-northeast-2.amazonaws.com/default/team.PNG";

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

    public TeamDto.ReadTeam toReadTeam(){
        return TeamDto.ReadTeam.builder()
                .teamId(this.getTeamId())
                .name(this.getName())
                .image(this.getImage())
                .build();
    }
}
