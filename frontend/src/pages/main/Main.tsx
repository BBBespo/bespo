import React, { useState } from 'react';
import styled from 'styled-components';
import DashBoard from '../../components/main/manager/DashBoard';
import NoTeam from '../../components/main/joinTeam/NoTeam';
import Player from '../../components/main/player/PlayerMain';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 5vh;

  @media (max-width: 900px) {
    padding: 0;
  }
`;
export default function Main() {
  const [value, setValue] = useState(0);
  return (
    <MainContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setValue(0)}>0</button>
        <button onClick={() => setValue(1)}>1</button>
        <button onClick={() => setValue(2)}>2</button>
      </div>

      {value === 0 && <DashBoard />}
      {value === 1 && <NoTeam />}
      {value === 2 && <Player />}
    </MainContainer>
  );
}
