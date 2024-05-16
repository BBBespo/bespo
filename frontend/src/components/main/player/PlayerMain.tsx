import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Schedule from '../Schedule';
import injury from '../../../assets/images/injury.png';
import condition from '../../../assets/images/condition.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConditionWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const ConditionButtonWrapper = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 0px;
`;

const ButtonImg = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

const PlayerSchedule = styled(Schedule)`
  width: 90%;
  margin-bottom: 20px;
`;

export default function PlayerMain() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <PlayerSchedule />
      <ConditionWrapper>
        <ConditionButtonWrapper>
          <ButtonImg src={condition} alt="condition" onClick={() => navigate('/condition')} />
          <p>컨디션 체크</p>
        </ConditionButtonWrapper>
        <ConditionButtonWrapper>
          <ButtonImg src={injury} alt="injury" onClick={() => navigate('/injury')} />
          <p>부상 체크</p>
        </ConditionButtonWrapper>
      </ConditionWrapper>
    </Wrapper>
  );
}
