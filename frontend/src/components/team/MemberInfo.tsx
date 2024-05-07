import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 5px;
  flex: 1;
  padding: 10px 30px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
`;

const MemberCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding: 15px 0px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
`;

const MemberCardText = styled.text`
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray4};

  @media screen and (max-width: 900px) {
    font-size: 10px;
  }

  // todo : 팀장인 경우 색상 변경
`;

const MemberCard = (member: MemberProps) => {
  return (
    <MemberCardContainer>
      <MemberCardText>{member.name}</MemberCardText>
      <MemberCardText>{member.isCaptain ? '팀장' : ''}</MemberCardText>
      <MemberCardText>{member.number}</MemberCardText>
    </MemberCardContainer>
  );
};

interface MemberProps {
  memberId: number;
  name: string;
  isCaptain: boolean;
  number: number;
}

const MemberInfo = () => {
  const [members, setMembers] = useState<MemberProps[]>([]);

  // todo : 멤버 정보를 가져오는 API 호출
  useEffect(() => {
    setMembers([
      { name: '김팀장', isCaptain: true, number: 1, memberId: 1 },
      { name: '박팀원', isCaptain: false, number: 2, memberId: 2 },
      { name: '이팀원', isCaptain: false, number: 3, memberId: 3 },
      { name: '최팀원', isCaptain: false, number: 4, memberId: 4 },
      { name: '김팀장', isCaptain: false, number: 1, memberId: 1 },
      { name: '박팀원', isCaptain: false, number: 2, memberId: 2 },
      { name: '이팀원', isCaptain: false, number: 3, memberId: 3 },
      { name: '최팀원', isCaptain: false, number: 4, memberId: 4 },
      { name: '김팀장', isCaptain: false, number: 1, memberId: 1 },
      { name: '박팀원', isCaptain: false, number: 2, memberId: 2 },
      { name: '이팀원', isCaptain: false, number: 3, memberId: 3 },
      { name: '최팀원', isCaptain: false, number: 4, memberId: 4 },
    ]);
  }, []);

  return (
    <MemberInfoContainer>
      {members.map((member, index) => (
        <MemberCard {...member} key={index} />
      ))}
    </MemberInfoContainer>
  );
};

export default MemberInfo;
