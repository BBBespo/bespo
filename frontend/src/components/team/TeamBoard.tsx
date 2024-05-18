import React from 'react';
import styled from 'styled-components';
import TeamInfo from './TeamInfo';
import MemberInfo from './MemberInfo';
import { Member, TeamProps } from '../../types/team';
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

const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const Button = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  font-weight: 600;
  color: ${({ selected }) => (selected ? 'red' : 'black')};
  cursor: pointer;
  border-radius: 5px;
`;

const TeamBoard = ({
  team,
  members,
  onMemberSelected,
  onPageSelected,
  selectedButton,
}: {
  team: TeamProps;
  members: Array<Member>;
  onMemberSelected: (memberId: number) => void;
  onPageSelected: (page: string) => void;
  selectedButton: string;
}) => {
  const handleSelectMember = (memberId: number) => {
    onMemberSelected(memberId);
  };

  const handleSelectPage = (page: string) => {
    onPageSelected(page);
  };

  return (
    <TeamBoardContainer>
      <TeamInfo team={team} />
      <ButtonWrapper>
        <Button selected={selectedButton === '팀원 관리'} onClick={() => handleSelectPage('팀원 관리')}>
          팀원 관리
        </Button>
        <Button selected={selectedButton === '회원가입 관리'} onClick={() => handleSelectPage('회원가입 관리')}>
          회원가입 관리
        </Button>
        <Button selected={selectedButton === '공지사항 작성'} onClick={() => handleSelectPage('공지사항 작성')}>
          공지사항 작성
        </Button>
      </ButtonWrapper>
      <MemberInfo members={members} onMemberSelected={handleSelectMember} />
    </TeamBoardContainer>
  );
};

export default TeamBoard;
