import UserBoard from '../../components/team/UserBoard';
import TeamBoard from '../../components/team/TeamBoard';
import ApplicationBoard from '../../components/team/ApplicationBoard';
import NoticeRegister from '../../components/team/NoticeRegister';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { instance } from '../../axios/instance';
import formatDateString from '../../utils/formatData';
import { Member, TeamProps } from '../../types/team';

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
      setPage('팀원 관리');

      setSelectedMember(member);
    }
  };
  const [page, setPage] = useState('팀원 관리');
  const handleSelectPage = (page: string) => {
    setPage(page);
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
        const updatedMembers = res.data.data.members
          .map((member: Member) => {
            const roleName =
              member.role === 'Captain'
                ? '주장'
                : member.role === 'Coach'
                  ? '감독'
                  : member.role === 'Manager'
                    ? '매니저'
                    : '선수';
            return { ...member, roleName: roleName };
          })
          .sort((a: Member, b: Member) => {
            const order = ['감독', '매니저', '주장', '선수'];
            return order.indexOf(a.roleName) - order.indexOf(b.roleName);
          });

        setMembers(updatedMembers);
        setTeam(data);
      });
    }
  }, []);

  return (
    <TeamContainer>
      <TeamBoard
        team={team}
        members={members}
        onMemberSelected={handleSelectMember}
        onPageSelected={handleSelectPage}
        selectedButton={page}
      />
      {page === '팀원 관리' ? (
        <UserBoard selectedMember={selectedMember} />
      ) : page === '회원가입 관리' ? (
        <ApplicationBoard />
      ) : page === '공지사항 작성' ? (
        <NoticeRegister></NoticeRegister>
      ) : (
        <></>
      )}
    </TeamContainer>
  );
};

export default Team;
