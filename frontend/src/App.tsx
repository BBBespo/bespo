import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/main/Main';
import Memo from './pages/main/Memo';
import Schedule from './pages/main/Schedule';
import Login from './pages/login/Login';
import Team from './pages/main/Team';
import KakaoLoginRedirection from './pages/login/KakaoLogin';

const Wrapper = styled.div`
  font-family: Pretendard;
  background-color: '#FFFFFF';
  margin: 0;
`;

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/team" element={<Team />} />
          <Route path="/kakao/callback" element={<KakaoLoginRedirection />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
