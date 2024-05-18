import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

interface acceptList {
  title: string;
  createdAt: string;
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

  return (
    <Wrapper>
      <HeadText>
        <p>신청 관리</p>
      </HeadText>
      {acceptList.length === 0 ? (
        <p>신청이 없습니다.</p>
      ) : (
        acceptList.map((item, index) => (
          <div key={index}>
            <p>{item.title}</p>
            <p>{item.createdAt}</p>
          </div>
        ))
      )}
    </Wrapper>
  );
}
