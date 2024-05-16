import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const UserBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px;
  flex: 1;
  gap: 3rem;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const MemberDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: calc(50% - 15px);
  // 테두리 체크용
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const MemberContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(50% - 15px);
  gap: 2rem;

  @media screen and (max-width: 900px) {
    align-items: center;
    flex-direction: column;
    height: auto;
  }
`;

const MemberContentTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MemberContentTitleText = styled.div`
  font-family: PretendardVariable;
  font-size: 20px;
  font-weight: 600;
`;

const MemberContentDetailText = styled(NavLink)`
  font-family: PretendardVariable;
  color: ${(props) => props.theme.colors.gray3};
  font-size: 16px;
  font-weight: 300;
  text-decoration: underline;
`;

interface MemoCardProps {
  id: number;
  title: string;
  date: string;
}

const MemoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.gray0};
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const MemoCardTitleText = styled.div`
  font-family: PretendardVariable;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  overflow: hidden; /* 요소의 내용을 넘치는 부분을 숨김 */
  white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
  text-overflow: ellipsis; /* 너무 긴 텍스트일 경우 생략 부호로 표시 */
`;

const MemoCardDateText = styled.div`
  font-family: PretendardVariable;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray3};
`;

const MemoCard = ({ memo }: { memo: MemoCardProps }) => {
  return (
    <MemoCardContainer>
      <MemoCardTitleText>{memo.title}</MemoCardTitleText>
      <MemoCardDateText>{memo.date}</MemoCardDateText>
    </MemoCardContainer>
  );
};

const MemberContent = ({ selectedMember }: { selectedMember: number }) => {
  const [injury, setInjury] = useState<MemoCardProps[]>([]);
  const [memo, setMemo] = useState<MemoCardProps[]>([]);

  useEffect(() => {
    // todo : 특정 멤버의 통증, 부상 정보를 가져오는 API 호출
    setInjury([
      {
        id: 1,
        title: selectedMember + '번 선수 허리 통증 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트',
        date: '2021-09-01',
      },
      { id: 2, title: selectedMember + '번 선수 무릎 통증', date: '2021-09-01' },
      { id: 3, title: selectedMember + '번 선수 발목 통증', date: '2021-09-01' },
      { id: 4, title: selectedMember + '번 선수 허리 통증', date: '2021-09-01' },
      { id: 5, title: selectedMember + '번 선수 무릎 통증', date: '2021-09-01' },
    ]);
    // todo : 특정 멤버의 메모 정보를 가져오는 API 호출
    setMemo([
      { id: 1, title: selectedMember + '번 선수 고민', date: '2021-09-01' },
      { id: 2, title: selectedMember + '번 선수 고민', date: '2021-09-01' },
      { id: 3, title: selectedMember + '번 선수 고민', date: '2021-09-01' },
      { id: 4, title: selectedMember + '번 선수 고민', date: '2021-09-01' },
      { id: 5, title: selectedMember + '번 선수 고민', date: '2021-09-01' },
    ]);
  }, [selectedMember]);

  return (
    <MemberContentContainer>
      <MemberMemoContainer>
        <MemberContentTitleContainer>
          <MemberContentTitleText>최근 통증, 부상 정보</MemberContentTitleText>
          <MemberContentDetailText to="/injury">더보기</MemberContentDetailText>
        </MemberContentTitleContainer>
        <MemberMemoContentContainer>
          {injury.map((memo, index) => (
            <MemoCard key={index} memo={memo} />
          ))}
        </MemberMemoContentContainer>
      </MemberMemoContainer>
      <MemberMemoContainer>
        <MemberContentTitleContainer>
          <MemberContentTitleText>최신 메모</MemberContentTitleText>
          <MemberContentDetailText to="/memo">더보기</MemberContentDetailText>
        </MemberContentTitleContainer>
        <MemberMemoContentContainer>
          {memo.map((memo, index) => (
            <MemoCard key={index} memo={memo} />
          ))}
        </MemberMemoContentContainer>
      </MemberMemoContainer>
    </MemberContentContainer>
  );
};

const MemberMemoContentContainer = styled.div`
  overflow-y: auto;

  scrollbar-width: none; /* Firefox에 대한 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE 및 Edge에 대한 스크롤바 숨김 */

  &::-webkit-scrollbar {
    display: none; /* WebKit(Chrome, Safari 등)에 대한 스크롤바 숨김 */
  }
`;

const MemberMemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 10px);

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  // 테두리 체크용
  /* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25); */
`;

const SelectMemberContainer = styled.div`
  height: 100%;
  padding: 30px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const SelectMemberText = styled.div`
  font-family: PretendardVariable;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const MemberProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-left: 20px;

  @media screen and (max-width: 900px) {
    width: 80px;
    height: 80px;
  }
`;

const MemberInfoContent = styled.div`
  font-family: PretendardVariable;
  font-size: 18 px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};

  @media screen and (max-width: 900px) {
    font-size: 10px;
  }
`;

interface MemberProps {
  memberId: number;
  img: string;
  email: string;
  name: string;
  weight: number;
  height: number;
  birth: string;
  tel: string;
  backNumber: number;
}

const MemberDetail = ({ selectedMember }: { selectedMember: number }) => {
  const [member, setMember] = useState<MemberProps>();

  useEffect(() => {
    // todo : 특정 멤버의 정보를 가져오는 API 호출
    setMember({
      memberId: selectedMember,
      img: 'https://via.placeholder.com/150',
      email: 'a@a.com',
      name: '선수' + selectedMember,
      weight: 70,
      height: 180,
      birth: '1990-01-01',
      tel: '010-1234-5678',
      backNumber: 7,
    });
  }, [selectedMember]);

  return (
    <MemberDetailContainer>
      <MemberProfileImg src={member?.img} />
      <MemberInfoContent>이름 : {member?.name}</MemberInfoContent>
      <MemberInfoContent>이메일 : {member?.email}</MemberInfoContent>
      <MemberInfoContent>몸무게 : {member?.weight}kg</MemberInfoContent>
      <MemberInfoContent>키 : {member?.height}cm</MemberInfoContent>
      <MemberInfoContent>생년월일 : {member?.birth}</MemberInfoContent>
      <MemberInfoContent>전화번호 : {member?.tel}</MemberInfoContent>
      <MemberInfoContent>등번호 : {member?.backNumber}</MemberInfoContent>
    </MemberDetailContainer>
  );
};

const UserBoard = ({ selectedMember }: { selectedMember: number }) => {
  useEffect(() => {
    console.log(selectedMember);
  }, [selectedMember]);

  if (selectedMember === -1) {
    return (
      <SelectMemberContainer>
        <SelectMemberText>선수를 선택해주세요.</SelectMemberText>
      </SelectMemberContainer>
    );
  } else {
    return (
      <UserBoardContainer>
        <MemberDetail selectedMember={selectedMember} />
        <MemberContent selectedMember={selectedMember} />
      </UserBoardContainer>
    );
  }
};

export default UserBoard;
