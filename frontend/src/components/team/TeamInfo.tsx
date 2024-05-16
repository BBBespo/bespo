import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TeamInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 0px 30px;
  border-radius: 5px;
  height: 30%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const TeamInfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TeamInfoText = styled.div`
  font-family: PretendardVariable;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray3};

  @media screen and (max-width: 900px) {
    font-size: 10px;
  }
`;

const TeamInfoContent = styled.div`
  font-family: PretendardVariable;
  font-size: 18 px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};

  @media screen and (max-width: 900px) {
    font-size: 10px;
  }
`;

const TeamImg = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 900px) {
    width: 80px;
    height: 80px;
  }
`;

const TeamImgSrc = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%;
`;

const TeamInfoTextContent = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;

  @media screen and (max-width: 900px) {
    width: 100px;
    height: 100px;
  }
`;

interface TeamProps {
  teamImg: string;
  teamName: string;
  createDate: string;
  memberCount: number;
}

const TeamInfo = () => {
  const [team, setTeam] = useState<TeamProps>({
    teamImg: '',
    teamName: '',
    createDate: '',
    memberCount: 0,
  });

  // todo: 팀 정보 가져오기
  useEffect(() => {
    setTeam({
      teamImg:
        'https://i.namu.wiki/i/ZdXBsG1Inn2jTKBgGukwHGI4usnnoW6j1YJoY74hg5dcRfrLxRKkW9-CDsBrmXdbyO64ad1etZMbkOiaGErlZg.png',
      teamName: 'FC 짜이완짜이',
      createDate: '24.04.12',
      memberCount: 45,
    });
  }, []);
  return (
    <TeamInfoContainer>
      <TeamImg>
        <TeamImgSrc src={team.teamImg} />
      </TeamImg>
      <TeamInfoTextContent>
        <TeamInfoTextBox>
          <TeamInfoText>팀명</TeamInfoText>
          <TeamInfoContent>{team.teamName}</TeamInfoContent>
        </TeamInfoTextBox>
        <TeamInfoTextBox>
          <TeamInfoText>생성일</TeamInfoText>
          <TeamInfoContent>{team.createDate}</TeamInfoContent>
        </TeamInfoTextBox>
        <TeamInfoTextBox>
          <TeamInfoText>팀원</TeamInfoText>
          <TeamInfoContent>{team.memberCount}명</TeamInfoContent>
        </TeamInfoTextBox>
      </TeamInfoTextContent>
    </TeamInfoContainer>
  );
};

export default TeamInfo;
