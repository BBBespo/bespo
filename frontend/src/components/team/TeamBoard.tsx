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
interface TeamProps {
  teamImg: string;
  teamName: string;
  createDate: string;
  memberCount: number;
}

type Member = {
  createdDate: string;
  modifiedDate: string;
  flag: boolean;
  memberId: number;
  email: string;
  name: string;
  role: string;
  weight: number;
  height: number;
  birth: string;
  tel: string;
  backNumber: number;
  imgUrl: string;
  statuses: any[];
  trainings: any[];
  injurys: any[];
  memos: any[];
  oauthProvider: string;
  createDate: string;
};
const TeamBoard = ({
  team,
  members,
  onMemberSelected,
}: {
  team: TeamProps;
  members: Array<Member>;
  onMemberSelected: (memberId: number) => void;
}) => {
  const handleSelectMember = (memberId: number) => {
    onMemberSelected(memberId);
  };

  return (
    <TeamBoardContainer>
      <TeamInfo team={team} />
      <MemberInfo members={members} onMemberSelected={handleSelectMember} />
    </TeamBoardContainer>
  );
};

export default TeamBoard;
