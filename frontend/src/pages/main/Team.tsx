import UserBoard from '../../components/team/UserBoard';
import TeamBoard from '../../components/team/TeamBoard';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { instance } from '../../axios/instance';
import formatDateString from '../../utils/formatData';

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
const Team = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [team, setTeam] = useState<TeamProps>({
    teamImg: '',
    teamName: '',
    createDate: '',
    memberCount: 0,
  });
  const [members, setMembers] = useState<Member[]>([]);
  const handleSelectMember = (memberId: number) => {
    //members안에 memberId가 있는지 확인
    const member = members.find((member) => member.memberId === memberId);
    if (member) {
      console.log('멤버 선택', member);
      setSelectedMember(member);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('login-state')) {
      const teamId = JSON.parse(localStorage.getItem('login-state')!).state.team.teamId;
      instance.get(`teams?teamId=${teamId}`).then((res) => {
        console.log('팀 조회 성공');
        const data = {
          teamImg: res.data.data.image,
          teamName: res.data.data.name,
          createDate: formatDateString(res.data.data.createdDate),
          memberCount: res.data.data.members.length,
        };
        setMembers(res.data.data.members);
        setTeam(data);
      });
    }
  }, []);

  return (
    <TeamContainer>
      <TeamBoard team={team} members={members} onMemberSelected={handleSelectMember} />
      <UserBoard selectedMember={selectedMember} />
    </TeamContainer>
  );
};

export default Team;
