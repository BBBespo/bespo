import UserBoard from '../../components/team/UserBoard';
import TeamBoard from '../../components/team/TeamBoard';
import React, { useState } from 'react';
import styled from 'styled-components';

const TeamContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  height: calc(100vh - 100px);
  padding: 2rem 5rem 3rem 5rem;

  gap: 2rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
`;

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<number>(-1);

  const handleSelectMember = (memberId: number) => {
    setSelectedMember(memberId);
  };

  return (
    <TeamContainer>
      <TeamBoard onMemberSelected={handleSelectMember} />
      <UserBoard selectedMember={selectedMember} />
    </TeamContainer>
  );
};

export default Team;
