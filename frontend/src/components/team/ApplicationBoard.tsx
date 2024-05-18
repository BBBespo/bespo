import React, { useEffect } from 'react';
import styled from 'styled-components';

import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ApplicationBoard = () => {
  useEffect(() => {
    instance
      .get('/teams/accept')
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <Wrapper></Wrapper>;
};

export default ApplicationBoard;
