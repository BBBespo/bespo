import React from 'react';
import { instance } from 'src/axios/instance';

type User = {
  accessToken: string;
  name: string;
  profile: string;
  email: string;
  hasTeam: boolean;
  role: string;
  team: {
    teamId: number;
    name: string;
    image: string;
    code: string;
  } | null;
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
              console.log(res.data);
              const user: User = {
                accessToken: accessToken,
                name: res.data.data.name,
                profile: res.data.data.imgUrl,
                email: res.data.data.email,
                hasTeam: res.data.data.team !== null,
                role: res.data.data.role,
                team: res.data.data.team,
              };

              setUser(user);
              if (res.data.data.tel) {
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
