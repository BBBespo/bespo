import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/main/Main';
import Memo from './pages/main/Memo';

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
          <Route path="/mypage" element={<Main />} />
          <Route path="/memo" element={<Memo />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
