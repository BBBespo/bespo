import React, { useState } from 'react';
import styled from 'styled-components';
import { Member } from '../../types/team';
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

  @media screen and (max-width: 900px) {
    padding: 10px;
    flex: 0;
    max-height: 150px;
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

const MemberCardText = styled.div<{ $isSelected: boolean }>`
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => (props.$isSelected ? props.theme.colors.red : props.theme.colors.gray4)};

  @media screen and (max-width: 900px) {
    font-size: 10px;
  }

  // todo : 선택된 멤버의 색상을 변경하는 CSS 코드 작성
`;

const MemberCard = ({
  member,
  onClick,
  isSelected,
}: {
  member: Member;
  onClick: (memberId: number) => void;
  isSelected: boolean;
}) => {
  return (
    <MemberCardContainer
      onClick={() => {
        onClick(member.memberId);
        console.log(member.memberId + ' has selected');
      }}
    >
      <MemberCardText $isSelected={isSelected}>{member.name}</MemberCardText>
      <MemberCardText $isSelected={isSelected}>{member.roleName}</MemberCardText>
      <MemberCardText $isSelected={isSelected}>{member.backNumber}</MemberCardText>
    </MemberCardContainer>
  );
};

const MemberInfo = ({
  members,
  onMemberSelected,
}: {
  members: Array<Member>;
  onMemberSelected: (memberId: number) => void;
}) => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const handleSelectMember = (memberId: number) => {
    onMemberSelected(memberId);
    setSelectedMember(memberId);
  };

  return (
    <MemberInfoContainer>
      {members.map((member, index) => (
        <MemberCard
          key={index}
          member={member}
          onClick={(memberId) => {
            handleSelectMember(memberId);
          }}
          isSelected={selectedMember === member.memberId}
        />
      ))}
    </MemberInfoContainer>
  );
};

export default MemberInfo;
