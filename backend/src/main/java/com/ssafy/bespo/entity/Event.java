package com.ssafy.bespo.entity;

import com.ssafy.bespo.Enum.EventType;
import com.ssafy.bespo.dto.EventDto;
import jakarta.persistence.*;
import java.util.ArrayList;
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

    public void updateEvent(EventDto.updateEventRequest request){
        this.start = request.getStart();
        this.end = request.getEnd();
        this.title = request.getTitle();
        this.content = request.getContent();
        this.type = request.getType();
        this.location = request.getLocation();
        if(this.attendees == null){
            this.attendees = new ArrayList<>();
            this.attendees = request.getAttendees();
        } else{
            this.attendees = request.getAttendees();
        }
    }
}
