import React, { useState } from 'react';
import styled from 'styled-components';
import createTeam from '../../assets/images/createTeam.png';
import joinTeam from '../../assets/images/joinTeam.png';
const DashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30%;
  > h1 {
    font-size: 36px;
    font-weight: 600;
  }
  > p {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray3};
  }
`;

const CardContainer = styled.div`
  display: flex;
  width: 2000px;
  height: 550px;
  justify-content: center;
`;

const CardDiv = styled.div`
  width: 40%;
  margin: 30px;
  background-color: #f3f3f3;
  padding: 4%;
  border-radius: 20px;
`;
const CardHeadText = styled.p`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const CardContentText = styled.p`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 5%;
`;
const CardButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 20px;
  width: 100%;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 60px;
    background-color: ${(props) => props.theme.colors.gray5};
    border-radius: 20px;
    font-size: 24px;
    font-weight: 500;
    color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
const ModalDiv = styled.div`
  width: 50%;
  height: 60%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export default function NoTeam() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <ModalBackground
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <ModalDiv></ModalDiv>
        </ModalBackground>
      )}
      <DashBoardContainer>
        <TextDiv>
          <h1>팀이 없습니다</h1>
          <h1>팀을 만들거나 합류해보세요!</h1>
          <p>Begin, Behave, Beyond</p>
        </TextDiv>
        <CardContainer>
          <CardDiv
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <CardHeadText>새로운 팀을 만들어 보세요!</CardHeadText>
            <CardContentText>팀을 만들면 관리자가 됩니다.</CardContentText>
            <CardButtonDiv>
              <div>
                <p>팀 만들기</p>
              </div>
              <img src={createTeam} alt="" />
            </CardButtonDiv>
          </CardDiv>
          <CardDiv
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <CardHeadText>팀원으로 합류해 보세요!</CardHeadText>
            <CardContentText>팀코드를 입력하여 합류하면 됩니다.</CardContentText>
            <CardButtonDiv>
              <div>
                <p>팀 합류하기</p>
              </div>
              <img src={joinTeam} alt="" />
            </CardButtonDiv>
          </CardDiv>
        </CardContainer>
      </DashBoardContainer>
    </>
  );
}
