package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.ScheduleType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class Schedule {

    @Id @GeneratedValue
    private Integer id;

    private Timestamp start;
    private Timestamp end;
    private String name;

    private ScheduleType type;

    private String location;

//    private List<Member> attendees;

}
