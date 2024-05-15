import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/main/Main';
import Memo from './pages/main/Memo';
import Schedule from './pages/main/Schedule';
import Login from './pages/login/Login';
import Team from './pages/main/Team';
import NickName from './pages/signup/Nickname';
import Condition from './pages/player/Condition';
import Injury from './pages/player/Injury';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';

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
          <Route path="/nickname" element={<NickName />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/injury" element={<Injury />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
