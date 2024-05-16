import React from 'react';
import styled from 'styled-components';
import PlayerSlider from '../../components/PlayerSlider';

const Wrapper = styled.div`
  margin: 0% 5% 0% 5%;
  width: 90%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderWrapper = styled.div`
  margin: 0% 5% 0% 5%;
  width: 100%;
  max-width: 900px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 40px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
`;

export default function Condition() {
  return (
    <Wrapper>
      <SliderWrapper>
        <PlayerSlider slidername="피로도" />
        <PlayerSlider slidername="스트레스" />
        <PlayerSlider slidername="근육상태" />
        <PlayerSlider slidername="기분" />
        <SubmitButton>제출하기</SubmitButton>
      </SliderWrapper>
    </Wrapper>
  );
}
