import React from 'react';
import styled from 'styled-components';
import Board1 from './Board1';
import Graph from './Graph';
import Player from './Player';
import Schedule from '../Schedule';
const DashBoardDiv = styled.div`
  height: 80vh;
  width: 100%;
  display: grid;
  grid-template-areas:
    'notice   stress   schedule'
    'injury   condition schedule';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;

  > .notice {
    grid-area: notice;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  > .stress {
    grid-area: stress;
  }
  > .schedule {
    grid-area: schedule;
  }
  > .memo {
    grid-area: memo;
  }
  > .injury {
    grid-area: injury;
  }
  > .condition {
    grid-area: condition;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;

export default function DashBoard() {
  return (
    <DashBoardDiv>
      <div className="notice">
        <Board1 boardName="공지사항"></Board1>
        <Board1 boardName="최신메모"></Board1>
      </div>
      <Graph className="stress">Stress</Graph>
      <Schedule className="schedule">Schedule</Schedule>
      <Player className="injury" boardName="부상선수">
        Injury
      </Player>
      <Player className="condition" boardName="컨디션 관리가 필요한 선수">
        Condition
      </Player>
    </DashBoardDiv>
  );
}
