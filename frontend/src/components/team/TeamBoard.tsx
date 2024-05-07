import React from 'react';
import styled from 'styled-components';
import TeamInfo from './TeamInfo';
import MemberInfo from './MemberInfo';

const TeamBoardContainer = styled.div`
  display: flex;
  width: 450px;
  flex-direction: column;
  padding: 0vh 5vh;
`;

const TeamBoard = () => {
  return (
    <TeamBoardContainer>
      <TeamInfo />
      <MemberInfo />
    </TeamBoardContainer>
  );
};

export default TeamBoard;
