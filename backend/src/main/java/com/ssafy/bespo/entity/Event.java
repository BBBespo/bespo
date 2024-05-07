package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.EventType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "event_id")
    private Integer eventId;

    private LocalDateTime start;
    private LocalDateTime end;
    private String title;
    private String content;

    private EventType type;

    private String location;

    private List<String> attendees;

}
