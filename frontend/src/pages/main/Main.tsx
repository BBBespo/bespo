import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DashBoard from '../../components/main/manager/DashBoard';
import NoTeam from '../../components/main/joinTeam/NoTeam';
import Player from '../../components/main/player/PlayerMain';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('login-state')) {
      const accessToken = JSON.parse(localStorage.getItem('login-state')!).state.accessToken;
      const hasTeam = JSON.parse(localStorage.getItem('login-state')!).state.hasTeam;
      const role = JSON.parse(localStorage.getItem('login-state')!).state.role;
      if (accessToken == null) navigate('/login');
      else if (!hasTeam) setValue(1);
      else if (role == 'Manager') setValue(0);
      else if (role == 'Player') setValue(2);

      // navigate('/login');
    }
  }, []);
  return (
    <MainContainer>
      {value === 0 && <DashBoard />}
      {value === 1 && <NoTeam />}
      {value === 2 && <Player />}
    </MainContainer>
  );
}
