package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.ScheduleDto;
import com.ssafy.bespo.entity.Schedule;
import com.ssafy.bespo.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    // 일정 등록
    public Schedule createSchedule(ScheduleDto.createScheduleRequest request){
        Schedule schedule = Schedule.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .start(request.getStart())
            .end(request.getEnd())
            .type(request.getType())
            .location(request.getLocation())
            .attendees(request.getAttendees())
            .build();

        scheduleRepository.save(schedule);
        return schedule;
    }
}
