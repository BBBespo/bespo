package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.ScheduleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "schedule_id")
    private Integer scheduleId;

    private LocalDateTime start;
    private LocalDateTime end;
    private String title;
    private String content;

    private ScheduleType type;

    private String location;

    private List<String> attendees;

}
