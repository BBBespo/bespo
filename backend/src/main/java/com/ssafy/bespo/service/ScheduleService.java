package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.ScheduleDto;
import com.ssafy.bespo.entity.Schedule;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.ScheduleRepository;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    // 일정 전체 조회
    public List<Schedule> readAllSchedule(){
        List<Schedule> scheduleList = scheduleRepository.findAll();
        if(scheduleList == null){
            throw new CustomException(ErrorCode.No_EXIST_SCHEDULE);
        }

        return scheduleList;
    }

    // 특정 월 일정 조회
    public List<Schedule> readMonthSchedule(int scheduleId, Month month){

        // 특정 월로 일정 조회 코드
        List<Schedule> schedules = scheduleRepository.findAll();

        List<Schedule> scheduleList = new ArrayList<>();

        for(Schedule schedule : schedules){
            Month m = schedule.getStart().getMonth();
            if(month.equals(m)){
                scheduleList.add(schedule);
            }
        }

        return scheduleList;
    }

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
