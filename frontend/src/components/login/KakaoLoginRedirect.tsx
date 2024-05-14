import React from 'react';
import { instance } from 'src/axios/instance';

type User = {
  accessToken: string;
  nickname: string;
  profile: string;
  email: string;
};

type KakaoProps = {
  code: string;
  setUser: (user: User) => void;
};

const KakaoLoginRedirectComponent = ({ code, setUser }: KakaoProps) => {
  instance
    .post('/members/kakao', {
      authorizationCode: code,
    })
    .then((res) => {
      if (res && res.data) {
        if (res.data) {
          const accessToken = res.data.accessToken;
          instance.get(`/members/${accessToken}`).then((res) => {
            const user: User = {
              accessToken: accessToken,
              nickname: res.data.name,
              profile: '',
              email: res.data.email,
            };
            setUser(user);
            if (user.nickname) {
              window.location.href = '/';
            } else {
            }
          });
        }
      }
    })
    .catch(() => {});
  return <></>;
};

export default KakaoLoginRedirectComponent;
