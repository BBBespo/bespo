import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddScheduleModal from '../../components/schedule/AddScheduleModal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContentArg } from '@fullcalendar/core';
import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 5vh;
  margin-bottom: 100px;
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

const HeadBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 30px;
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
`;

const CalendarWrapper = styled.div`
  padding-bottom: 50px;
  width: 100%;

  .fc-toolbar.fc-header-toolbar .fc-prev-button,
  .fc-toolbar.fc-header-toolbar .fc-next-button {
    background-color: white;
    border: 1px solid white;
    color: black;
  }

  .fc-toolbar-title {
    font-size: 20px;
  }
  .fc-daygrid-event {
    background-color: #ffa18e;
    border: none;
    margin-bottom: 5px;
  }
`;

const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const getEventsList = () => {
    instance.get('/events').then((res: AxiosResponse) => {
      setEvents(res.data.data);
    });
  };

  useEffect(() => {
    getEventsList();
  }, []);

  // const events = [
  //   {
  //     title: '일정1',
  //     start: '2024-05-07T14:00:00',
  //     end: '2024-05-08T16:00:00',
  //   },
  //   {
  //     title: '일정2',
  //     start: '2024-05-07T14:00:00',
  //     end: '2024-05-08T16:00:00',
  //   },
  //   {
  //     title: '일정3',
  //     start: '2024-05-07T14:00:00',
  //     end: '2024-05-08T16:00:00',
  //   },
  // ];

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
      <HeadBox
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <AddScheduleBtn>일정 추가</AddScheduleBtn>
      </HeadBox>

      {isOpen && (
        <ModalBackground>
          <AddScheduleModal getEventsList={getEventsList} onClose={() => setIsOpen(false)} />
        </ModalBackground>
      )}

      <CalendarWrapper>
        <FullCalendar
          locale="kr"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          height={'80vh'}
        />
      </CalendarWrapper>
    </ScheduleContainer>
  );
};

export default Schedule;
