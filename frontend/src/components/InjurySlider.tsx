import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface InjurySliderProps {
  slidername?: string;
  sliderValue?: number | number[];
  onChange?: (value: number | number[]) => void;
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
  width: 95%;
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
  width: 100%;
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
  font-size: 12px;
`;

// const conditions = [
//   '1단계: 경미한 통증',
//   '2단계: 가벼운 통증',
//   '3단계: 중간 정도의 통증',
//   '4단계: 심한 통증',
//   '5단계: 매우 심한 통증',
// ];

export default function InjurySlider({ slidername, sliderValue, onChange }: InjurySliderProps) {
  return (
    <Wrapper>
      <Header>
        <p>{slidername}</p>
        {/* {Array.isArray(sliderValue) ? (
          <p>{conditions[sliderValue[sliderValue.length - 1]]}</p>
        ) : (
          <p>{conditions[sliderValue]}</p>
        )} */}
      </Header>
      <SliderWrapper>
        <RcSlider
          dots
          min={0}
          max={4}
          step={1}
          defaultValue={0}
          value={sliderValue}
          onChange={onChange}
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
        <p>약함</p>
        <p>강함</p>
      </Footer>
    </Wrapper>
  );
}
