import React, { useState } from 'react';
import styled from 'styled-components';
import AddScheduleModal from '../../components/schedule/AddScheduleModal';

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScheduleContainer>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
      >
        일정 추가
      </div>

      {isOpen && (
        <ModalBackground>
          <AddScheduleModal />
        </ModalBackground>
      )}
    </ScheduleContainer>
  );
};

export default Schedule;
