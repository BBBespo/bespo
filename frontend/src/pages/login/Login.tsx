import React from 'react';
import styled from 'styled-components';

import KakaoLogin from '../../assets/icons/kakaoLogin.png';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  margin: 0% 5% 0% 5%;
  width: 90%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  width: 100%;
  height: 50vh;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h1`
  font-family: GiantsInline;
  color: #ff0000;
  font-size: 50px;
  margin-bottom: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: ${(props) => props.theme.colors.black};
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  & > p {
    margin: 0px 0;
  }
`;

export default function Login() {
  return (
    <Wrapper>
      <Contents>
        <HeaderText>Bespo</HeaderText>
        <Content>
          <p>간편하게 로그인하고</p>
          <p>다양한 서비스를 이용해보세요</p>
        </Content>
        <img
          src={KakaoLogin}
          alt="kakaoLogin"
          onClick={() =>
            (window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`)
          }
        />
        <NavLink to="/Nickname">닉네임</NavLink>
        <NavLink to="/Condition">컨디션</NavLink>
        <NavLink to="/Injury">부상</NavLink>
      </Contents>
    </Wrapper>
  );
}
