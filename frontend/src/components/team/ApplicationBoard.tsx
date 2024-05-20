import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

interface acceptList {
  email: string;
  alarmId: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px;
  flex: 1;
  gap: 3rem;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const HeadText = styled.div`
  text-align: center;
  margin-bottom: 15px;
  > p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;
export default function ApplicationBoard() {
  const [acceptList, setAcceptList] = useState<acceptList[]>([]);
  useEffect(() => {
    instance
      .get('/teams/accept')
      .then((res: AxiosResponse) => {
        console.log(res);
        setAcceptList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const accpetTeam = (alarmId: string) => {
    instance
      .post(`/teams/accept?alarmId=${alarmId}`)
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <HeadText>
        <p>신청 관리</p>
      </HeadText>
      {acceptList.length === 0 ? (
        <p>신청이 없습니다.</p>
      ) : (
        acceptList.map((item, index) => (
          <InnerBox key={index} onClick={() => accpetTeam(item.alarmId)}>
            <p>{item.email}</p>
            <button>수락하기</button>
          </InnerBox>
        ))
      )}
    </Wrapper>
  );
}