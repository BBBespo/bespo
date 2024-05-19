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
import SignUp from './pages/signup/SignUp';
import Condition from './pages/player/Condition';
import Injury from './pages/player/Injury';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import MemoList from './pages/player/MemoList';
import WriteMemo from './pages/player/WriteMemo';
import MemoDetail from './pages/player/MemoDetail';

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/injury" element={<Injury />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/memo-list" element={<MemoList />} />
          <Route path="/memo/:id" element={<MemoDetail />} />
          <Route path="/write-memo" element={<WriteMemo />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
