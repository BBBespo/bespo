import React from 'react';
import KakaoLoginImg from 'src/assets/icons/kakaoLogin.png';

import * as S from './LoginStyle';

const KakaoLogin = () => {
  const KAKAO_REDIRECT_URI: string | undefined = process.env.REACT_APP_DOMAIN + '/kakao/callback';
  const KAKAO_CLIENT_ID: string | undefined = process.env.REACT_APP_KAKAO_CLIENT_ID;

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };

  return (
    <S.KakaoLoginButtonWrapper onClick={handleKakaoLogin}>
      <S.KakaoLoginButttonImgBox>
        <S.KakaoLoginButtonImg src={KakaoLoginImg} alt="KakaoLoginImg" />
      </S.KakaoLoginButttonImgBox>
      <S.KakaoLoginText>카카오 로그인</S.KakaoLoginText>
    </S.KakaoLoginButtonWrapper>
  );
};

export default KakaoLogin;
