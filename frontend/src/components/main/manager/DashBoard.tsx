import React from 'react';
import styled from 'styled-components';
import Board1 from './Board1';
import Board2 from './Board2';
import Graph from './Graph';
import Player from './Player';
import Player2 from './Player2';
import Schedule from '../Schedule';
const DashBoardDiv = styled.div`
  height: 80vh;
  width: 100%;
  display: grid;
  grid-template-areas:
    'noticewrap   stress   schedule'
    'injury   condition schedule';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr 3fr;
  gap: 20px;

  > .noticewrap {
    grid-area: noticewrap;
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
      <div className="noticewrap">
        <Board1 boardName="공지사항" className="notices"></Board1>
        <Board2 boardName="최신메모" className="memo"></Board2>
      </div>
      <Graph boardName="주간 운동부하 팀 합계" className="stress"></Graph>
      <Schedule className="schedule"></Schedule>
      <Player className="injury" boardName="부상선수">
        Injury
      </Player>
      <Player2 className="condition" boardName="컨디션 관리가 필요한 선수">
        Condition
      </Player2>
    </DashBoardDiv>
  );
}
