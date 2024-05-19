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
  font-weight: ${({ selected }) => (selected ? '600' : '500')};
  color: ${({ selected }) => (selected ? 'red' : 'black')};
  cursor: pointer;
  border-radius: 5px;

  p {
    position: relative;

    &:after {
      position: absolute;
      content: '';
      bottom: -4px; /* 부모 요소의 아래쪽에 위치시킴 */
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #ff0000;
      border-radius: 5px;
      transform: scaleX(0);
    }
    &:hover {
      color: #ff0000;
    }
    &:hover:after {
      transform: scaleX(1);
      transition: transform 0.6s ease;
    }
  }
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
          <p>팀원 관리</p>
        </Button>
        <Button selected={selectedButton === '회원가입 관리'} onClick={() => handleSelectPage('회원가입 관리')}>
          <p>회원가입 관리</p>
        </Button>
        <Button selected={selectedButton === '공지사항 작성'} onClick={() => handleSelectPage('공지사항 작성')}>
          <p>공지사항 작성</p>
        </Button>
      </ButtonWrapper>
      <MemberInfo members={members} onMemberSelected={handleSelectMember} />
    </TeamBoardContainer>
  );
};

export default TeamBoard;
