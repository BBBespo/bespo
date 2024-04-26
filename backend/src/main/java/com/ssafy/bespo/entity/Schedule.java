package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.ScheduleType;
import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Schedule extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "schedule_id")
    private Integer scheduleId;

    private LocalDateTime start;
    private LocalDateTime end;
    private String name;

    private ScheduleType type;

    private String location;

//    private List<Member> attendees;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
