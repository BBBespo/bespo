import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TeamInfo from './TeamInfo';
import MemberInfo from './MemberInfo';
import { instance } from '../../axios/instance';
import formatDateString from '../../utils/formatData';

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
  merbers: Array<any>;
}
const TeamBoard = ({ onMemberSelected }: { onMemberSelected: (memberId: number) => void }) => {
  const [team, setTeam] = useState<TeamProps>({
    teamImg: '',
    teamName: '',
    createDate: '',
    memberCount: 0,
    merbers: [],
  });
  const handleSelectMember = (memberId: number) => {
    onMemberSelected(memberId);
  };
  useEffect(() => {
    if (localStorage.getItem('login-state')) {
      const teamId = JSON.parse(localStorage.getItem('login-state')!).state.team.teamId;
      instance.get(`teams?teamId=${teamId}`).then((res) => {
        const data = {
          teamImg: res.data.data.image,
          teamName: res.data.data.name,
          createDate: formatDateString(res.data.data.createdDate),
          memberCount: res.data.data.members.length,
          merbers: res.data.data.members,
        };
        console.log('팀 조회 성공', data);
        setTeam(data);
      });
    }
  }, []);

  return (
    <TeamBoardContainer>
      <TeamInfo team={team} />
      <MemberInfo onMemberSelected={handleSelectMember} />
    </TeamBoardContainer>
  );
};

export default TeamBoard;
