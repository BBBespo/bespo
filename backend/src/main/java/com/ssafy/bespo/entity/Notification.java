package com.ssafy.bespo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.bespo.dto.TeamDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    private Integer notificationId;

    private String title;

    private String text;

    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "team_id")
    private Team team;

    private Integer writerId;

    public void updateNotification(String title, String text, String image){
        this.title = title;
        this.text = text;
        this.image = image;
    }

}
