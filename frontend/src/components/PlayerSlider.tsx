import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
type Status = {
  fatigue: number | null;
  stress: number | null;
  muscle: number | null;
  mood: number | null;
};
interface PlayerSliderProps {
  slidername?: string;
  type: string;
  setStatusValue: React.Dispatch<React.SetStateAction<Status>>;
}

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
`;

const dotStyle = {
  borderColor: 'black',
  height: 2,
  width: 2,
  bottom: -7,
  backgroundColor: 'black',
};

const activeDotStyle = {
  borderColor: 'red',
  height: 2,
  width: 2,
  bottom: -7,
  backgroundColor: 'black',
};
const RcSlider = styled(Slider)`
  margin-bottom: 20px;
  width: 100%;
  .rc-slider-step {
    width: 98%;
    margin-left: 1%;
  }
  .rc-slider-rail {
    border-radius: 10px;
  }

  .rc-slider-track {
    border-radius: 10px;
  }
`;

const Header = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.gray3};
  font-size: 14px;
`;

const conditions = ['매우나쁨', '나쁨', '보통', '좋음', '매우좋음'];

export default function PlayerSlider({ slidername, type, setStatusValue }: PlayerSliderProps) {
  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  useEffect(() => {
    setStatusValue((prev) => ({ ...prev, [type]: sliderValue }));
  }, [sliderValue]);
  return (
    <Wrapper>
      <Header>
        <p>{slidername}</p>
        {Array.isArray(sliderValue) ? (
          <p>{conditions[sliderValue[sliderValue.length - 1]]}</p>
        ) : (
          <p>{conditions[sliderValue]}</p>
        )}
      </Header>
      <SliderWrapper>
        <RcSlider
          dots
          min={0}
          max={4}
          step={1}
          defaultValue={0}
          onChange={setSliderValue}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
          trackStyle={{ backgroundColor: 'red', height: 20 }}
          railStyle={{ backgroundColor: 'lightgray', height: 20 }}
          handleStyle={{
            border: '1px solid #C8C8C8',
            height: 30,
            width: 30,
            bottom: -15,
            backgroundColor: 'white',
            opacity: 1,
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
          }}
        />
      </SliderWrapper>
      <Footer>
        <p>나쁨</p>
        <p>좋음</p>
      </Footer>
    </Wrapper>
  );
}
