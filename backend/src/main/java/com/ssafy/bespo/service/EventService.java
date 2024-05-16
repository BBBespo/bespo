package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.EventDto;
import com.ssafy.bespo.dto.EventDto.createEventRequest;
import com.ssafy.bespo.dto.NotificationDto;
import com.ssafy.bespo.entity.Event;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Notification;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.EventRepository;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.TeamRepository;
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
    private final AuthTokensGenerator authTokensGenerator;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;

    // 일정 전체 조회
    public List<Event> readAllEvent(String accessToken){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        List<EventDto.readEventResponse> responses = new ArrayList<>();

        List<Event> events = eventRepository.findAllByTeamAndFlagFalseOrderByCreatedDateDesc(member.getTeam());
        if(events == null){
            throw new CustomException(ErrorCode.No_EXIST_EVENT);
        }
        for(Event event : events){
            EventDto.readEventResponse response = EventDto.readEventResponse.builder()
                .title(event.getTitle())
                .content(event.getContent())
                .start(event.getStart())
                .end(event.getEnd())
                .type(event.getType())
                .location(event.getLocation())
                .attendees(event.getAttendees())
                .build();
            responses.add(response);
        }

        return events;
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
    public int createEvent(String accessToken, EventDto.createEventRequest request){

        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        Team team = member.getTeam();

        Event event = Event.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .start(request.getStart())
            .end(request.getEnd())
            .type(request.getType())
            .location(request.getLocation())
            .attendees(request.getAttendees())
            .team(team)
            .build();

        eventRepository.save(event);
        return event.getEventId();
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
