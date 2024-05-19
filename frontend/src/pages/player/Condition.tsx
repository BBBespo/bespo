import React, { useState } from 'react';
import styled from 'styled-components';
import PlayerSlider from '../../components/PlayerSlider';
import { useNavigate } from 'react-router-dom';
import { instance } from 'src/axios/instance';
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
type Status = {
  fatigue: number | null;
  stress: number | null;
  muscle: number | null;
  mood: number | null;
};
export default function Condition() {
  const navigate = useNavigate();

  const [statusValue, setStatusValue] = useState<Status>({
    fatigue: 0,
    stress: 0,
    muscle: 0,
    mood: 0,
  });

  return (
    <Wrapper>
      <SliderWrapper>
        <PlayerSlider slidername="피로도" type="fatigue" setStatusValue={setStatusValue} />
        <PlayerSlider slidername="스트레스" type="stress" setStatusValue={setStatusValue} />
        <PlayerSlider slidername="근육상태" type="muscle" setStatusValue={setStatusValue} />
        <PlayerSlider slidername="기분" type="mood" setStatusValue={setStatusValue} />
        <SubmitButton
          onClick={() => {
            const data = {
              status: statusValue,
            };
            instance.post('/status', data).then((res) => {
              console.log('컨디션체크등록성공', res);
              navigate('/');
            });
          }}
        >
          제출하기
        </SubmitButton>
      </SliderWrapper>
    </Wrapper>
  );
}
