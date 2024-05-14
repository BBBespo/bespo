import React from 'react';
import { instance } from 'src/axios/instance';

type User = {
  accessToken: string;
  name: string;
  profile: string;
  email: string;
  hasTeam: boolean;
  role: string;
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
          instance
            .get('/members', {
              headers: {
                accessToken: accessToken,
              },
            })
            .then((res) => {
              console.log(res);
              const user: User = {
                accessToken: accessToken,
                name: res.data.name,
                profile: '',
                email: res.data.email,
                hasTeam: res.data.team,
                role: res.data.role,
              };
              setUser(user);
              if (user.name) {
                window.location.href = '/';
              } else {
                window.location.href = '/signup';
              }
            });
        }
      }
    })
    .catch(() => {});
  return <></>;
};

export default KakaoLoginRedirectComponent;
