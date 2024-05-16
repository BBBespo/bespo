import React from 'react';
import styled from 'styled-components';
import TeamInfo from './TeamInfo';
import MemberInfo from './MemberInfo';

const TeamBoardContainer = styled.div`
  display: flex;
  width: 450px;
  flex-direction: column;
  gap: 2rem;

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 0;
  }
`;

const TeamBoard = ({ onMemberSelected }: { onMemberSelected: (memberId: number) => void }) => {
  const handleSelectMember = (memberId: number) => {
    onMemberSelected(memberId);
  };

  return (
    <TeamBoardContainer>
      <TeamInfo />
      <MemberInfo onMemberSelected={handleSelectMember} />
    </TeamBoardContainer>
  );
};

export default TeamBoard;
