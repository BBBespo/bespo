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
  scrollbar-width: none; /* Firefox에 대한 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE 및 Edge에 대한 스크롤바 숨김 */

  &::-webkit-scrollbar {
    display: none; /* WebKit(Chrome, Safari 등)에 대한 스크롤바 숨김 */
  }
`;

const MemberCardContainer = styled.button`
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

  // todo : 선택된 멤버의 색상을 변경하는 CSS 코드 작성
`;

const MemberCard = ({ member, onClick }: { member: MemberProps; onClick: (memberId: number) => void }) => {
  return (
    <MemberCardContainer
      onClick={() => {
        onClick(member.memberId);
        console.log(member.memberId + ' has selected');
      }}
    >
      <MemberCardText>{member.name}</MemberCardText>
      <MemberCardText>{member.isCaptain ? '주장' : ''}</MemberCardText>
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

const MemberInfo = ({ onMemberSelected }: { onMemberSelected: (memberId: number) => void }) => {
  const [members, setMembers] = useState<MemberProps[]>([]);

  // todo : 멤버 정보를 가져오는 API 호출
  useEffect(() => {
    setMembers([
      { name: '김팀장', isCaptain: true, number: 1, memberId: 1 },
      { name: '박팀원', isCaptain: false, number: 2, memberId: 2 },
      { name: '이팀원', isCaptain: false, number: 3, memberId: 3 },
      { name: '최팀원', isCaptain: false, number: 4, memberId: 4 },
      { name: '김팀장', isCaptain: false, number: 1, memberId: 5 },
      { name: '박팀원', isCaptain: false, number: 2, memberId: 6 },
      { name: '이팀원', isCaptain: false, number: 3, memberId: 7 },
      { name: '최팀원', isCaptain: false, number: 4, memberId: 8 },
      { name: '김팀장', isCaptain: false, number: 1, memberId: 9 },
      { name: '박팀원', isCaptain: false, number: 2, memberId: 10 },
      { name: '이팀원', isCaptain: false, number: 3, memberId: 11 },
      { name: '최팀원', isCaptain: false, number: 4, memberId: 12 },
    ]);
  }, []);

  return (
    <MemberInfoContainer>
      {members.map((member, index) => (
        <MemberCard
          key={index}
          member={member}
          onClick={(memberId) => {
            onMemberSelected(memberId);
          }}
        />
      ))}
    </MemberInfoContainer>
  );
};

export default MemberInfo;
