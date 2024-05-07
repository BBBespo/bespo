import React, { useState } from 'react';
import styled from 'styled-components';
import AddScheduleModal from '../../components/schedule/AddScheduleModal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContentArg } from '@fullcalendar/core';

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
  width: 100%;
  padding-bottom: 50px;
  .fc-toolbar.fc-header-toolbar .fc-prev-button,
  .fc-toolbar.fc-header-toolbar .fc-next-button {
    background-color: white;
    border: 1px solid white;
    color: black;
  }
  .fc-toolbar-title {
    font-size: 20px;
  }
`;

const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);

  const events = [
    { title: '결승전 최종 훈련1', start: new Date() },
    { title: '공격 및 수비 결정 테스트', start: new Date() },
  ];

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <div
        style={{
          display: 'flex',
          padding: '3px',
          margin: '0px 10px 0px 10px',
          background: '#ffa18e',
          fontSize: '12px',
        }}
      >
        <div style={{ marginRight: '5px' }}>{eventInfo.timeText}</div>
        <div style={{ fontWeight: 'bold' }}>{eventInfo.event.title}</div>
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
          <AddScheduleModal />
        </ModalBackground>
      )}

      <CalendarWrapper>
        <FullCalendar
          locale="kr"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
          eventContent={renderEventContent}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          aspectRatio={1.8}
        />
      </CalendarWrapper>
    </ScheduleContainer>
  );
};

export default Schedule;
