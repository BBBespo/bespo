import React, { useState } from 'react';
import styled from 'styled-components';
import close from '../../../assets/images/schedule/close.png';
import joinTeam from '../../../assets/images/joinTeam.png';

const JoinTeamModalContainer = styled.div`
  width: 30%;
  height: 58vh;
  padding: 4vh;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
`;

const CloseButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

const ModalHead = styled.div`
  text-align: center;
  > p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const JoinTeamImageBox = styled.div`
  text-align: center;
  margin-bottom: 25px;
`;

const TeamCodeInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

const TeamCodeInputText = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.red};
  color: #f3f3f3;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 15px;
  margin-right: 10px;
  font-size: 14px;
`;

const handleSubmitButton = () => {
  console.log('join team');
};

const JoinTeamModal = ({ onClose }: { onClose: () => void }) => {
  const [teamCode, setTeamCode] = useState('');

  return (
    <JoinTeamModalContainer>
      <CloseButtonBox>
        <img src={close} onClick={onClose} alt="close" style={{ width: '17px', height: '17px', cursor: 'pointer' }} />
      </CloseButtonBox>
      <ModalHead>
        <p>팀 합류하기</p>
      </ModalHead>
      <JoinTeamImageBox>
        <img src={joinTeam} alt="팀 합류" style={{ width: '40%' }} />
      </JoinTeamImageBox>
      <div>
        <TeamCodeInputText>팀 코드를 입력해주세요.*</TeamCodeInputText>
        <TeamCodeInput type="text" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} />
      </div>

      <SubmitButton onClick={handleSubmitButton}>팀 합류하기</SubmitButton>
    </JoinTeamModalContainer>
  );
};

export default JoinTeamModal;
