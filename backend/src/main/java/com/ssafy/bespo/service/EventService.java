package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.EventDto;
import com.ssafy.bespo.entity.Event;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.EventRepository;
import java.time.Month;
import java.time.Year;
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

    // 특정 연월 일정 조회
    public List<Event> readMonthEvent(int year, Month month){

        // 특정 연월로 일정 조회 코드
        List<Event> events = eventRepository.findAll();

        List<Event> eventList = new ArrayList<>();

        for(Event event : events){
            int y = event.getStart().getYear();
            Month m = event.getStart().getMonth();
            if(y == year && month.equals(m)){
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

    // 일정 수정
    public Event updateEvent(EventDto.updateEventRequest request){

        Event event = eventRepository.findByEventIdAndFlagFalse(request.getEventId());
        if(event == null){
            throw new CustomException(ErrorCode.No_EXIST_EVENT);
        }

        event.updateEvent(request);

        eventRepository.save(event);
        return event;
    }

    // 일정 삭제
    public void deleteEvent(int eventId){
        Event event = eventRepository.findByEventIdAndFlagFalse(eventId);
        if(event == null){
            throw new CustomException(ErrorCode.No_EXIST_EVENT);
        }
        eventRepository.delete(event);
    }
}
