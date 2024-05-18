import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddScheduleModal from '../../components/schedule/AddScheduleModal';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContentArg } from '@fullcalendar/core';
import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5vh;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const AddScheduleBtn = styled.span`
  border: 2px solid ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.red};
  border-radius: 5px;
  padding: 7px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  height: auto;

  position: absolute;
  right: 0;
`;

const CalendarWrapper = styled.div`
  position: relative;
  width: 100%;

  .fc-toolbar.fc-header-toolbar .fc-prev-button,
  .fc-toolbar.fc-header-toolbar .fc-next-button {
    background-color: white;
    border: 1px solid white;
    color: black;
  }

  .fc .fc-button-primary {
    background-color: transparent;
    border-color: transparent;
  }
`;

const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const getEventsList = () => {
    instance.get('/events').then((res: AxiosResponse) => {
      console.log(res.data.data);
      // 이벤트 데이터에 eventId를 포함시킴
      const eventsWithId = res.data.data.map((event: any) => ({
        ...event,
        extendedProps: { eventId: event.eventId },
      }));
      setEvents(eventsWithId);
    });
  };

  useEffect(() => {
    getEventsList();
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventId = clickInfo.event.extendedProps.eventId; // 커스텀 데이터 속성에서 eventId를 가져옴
    if (window.confirm(`정말로 '${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
      instance.delete(`/events?eventId=${eventId}`).then(() => {
        getEventsList(); // 이벤트 목록 갱신
      });
    }
  };

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <div
        style={{
          padding: '3px',
          margin: '0px 10px 0px 10px',
          fontSize: '12px',
          color: 'red',
        }}
      >
        <p>{eventInfo.event.title}</p>
      </div>
    );
  }

  return (
    <ScheduleContainer>
      {isOpen && (
        <ModalBackground>
          <AddScheduleModal getEventsList={getEventsList} onClose={() => setIsOpen(false)} />
        </ModalBackground>
      )}

      <CalendarWrapper>
        <AddScheduleBtn
          onClick={() => {
            setIsOpen(true);
          }}
        >
          일정 추가
        </AddScheduleBtn>
        <FullCalendar
          locale="kr"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: ' ',
          }}
          height={'80vh'}
        />
      </CalendarWrapper>
    </ScheduleContainer>
  );
};

export default Schedule;
