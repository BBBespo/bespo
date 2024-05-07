package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.EventDto;
import com.ssafy.bespo.entity.Event;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.EventRepository;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    // 일정 전체 조회
    public List<Event> readAllEvent(){
        List<Event> eventList = eventRepository.findAll();
        if(eventList == null){
            throw new CustomException(ErrorCode.No_EXIST_EVENT);
        }

        return eventList;
    }

    // 특정 월 일정 조회
    public List<Event> readMonthEvent(int eventId, Month month){

        // 특정 월로 일정 조회 코드
        List<Event> events = eventRepository.findAll();

        List<Event> eventList = new ArrayList<>();

        for(Event event : events){
            Month m = event.getStart().getMonth();
            if(month.equals(m)){
                eventList.add(event);
            }
        }

        return eventList;
    }

    // 일정 등록
    public Event createEvent(EventDto.createEventRequest request){
        Event event = Event.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .start(request.getStart())
            .end(request.getEnd())
            .type(request.getType())
            .location(request.getLocation())
            .attendees(request.getAttendees())
            .build();

        eventRepository.save(event);
        return event;
    }
}
