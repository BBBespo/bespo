import TeamBoard from '../../components/team/TeamBoard';
import React, { useState } from 'react';
import styled from 'styled-components';

const TeamContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  height: calc(100vh - 120px);
  padding: 2vh 5vh;
`;

const UserBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  margin: 0vh 5vh 0vh 0vh;
  flex: 1;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<number>(0);

  const handleSelectMember = (memberId: number) => {
    setSelectedMember(memberId);
  };

  return (
    <TeamContainer>
      <TeamBoard onMemberSelected={handleSelectMember} />
      <UserBoard>
        <text>{selectedMember}</text>
        <text>user info</text>
      </UserBoard>
    </TeamContainer>
  );
};

export default Team;
