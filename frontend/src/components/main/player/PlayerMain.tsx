import React from 'react';
import styled from 'styled-components';
import Schedule from '../Schedule';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConditionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const ConditionButtonWrapper = styled.div`
  width: 48%;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.gray4};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const PlayerSchedule = styled(Schedule)`
  width: 90%;
`;

export default function PlayerMain() {
  return (
    <Wrapper>
      <PlayerSchedule />
      <ConditionWrapper>
        <ConditionButtonWrapper>a</ConditionButtonWrapper>
        <ConditionButtonWrapper>b</ConditionButtonWrapper>
      </ConditionWrapper>
    </Wrapper>
  );
}
