import React from 'react';
import styled from 'styled-components';
import PlayerSlider from '../../components/PlayerSlider';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SliderWrapper>
        <PlayerSlider slidername="피로도" />
        <PlayerSlider slidername="스트레스" />
        <PlayerSlider slidername="근육상태" />
        <PlayerSlider slidername="기분" />
        <SubmitButton
          onClick={() => {
            navigate('/');
          }}
        >
          제출하기
        </SubmitButton>
      </SliderWrapper>
    </Wrapper>
  );
}
