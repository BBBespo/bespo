package com.ssafy.bespo.entity;

import jakarta.persistence.*;

@Entity
public class Notification extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    private Integer notificationId;

    private String title;

    private String text;

    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

}
