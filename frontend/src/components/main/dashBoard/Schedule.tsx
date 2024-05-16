import React from 'react';
import styled from 'styled-components';
import data from '../../../services/dummy/schedule';

interface ScheduleProps {
  children?: React.ReactNode;
  className?: string;
  boardName?: string;
}

interface CircleProps {
  active: boolean;
}

const Wrapper = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  padding: 5px 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin-bottom: 30px;
  margin-top: 15px;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
  margin-right: 15px;
`;

const HeaderDateText = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray3};
`;

const MoreText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
  text-decoration: underline;
  text-underline-offset: 5px;
  cursor: pointer;
`;

const DayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-bottom: 60px;
`;

const DayBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.gray4};
`;

const DayText = styled.p`
  font-size: 20px;
  color: ${(props) => props.theme.colors.gray4};
  margin-bottom: 20px;
`;

const DateText = styled.p`
  font-size: 22px;
  color: ${(props) => props.theme.colors.gray2};
  font-weight: 600;
`;

const ScheduleContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 9px;
    top: 50px;
    bottom: 50px;
    width: 2px;
    background-color: ${(props) => props.theme.colors.gray2};
    z-index: 5;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;
  width: 100%;
  height: 100px;

  p {
    margin-right: 5px;
  }
`;

const ScheduleText = styled.p<CircleProps>`
  font-size: 20px;
  font-family: PretendardSemiBold;
  justify-content: center;
  text-align: center;
  color: ${(props) => (props.active ? 'red' : props.theme.colors.gray4)};
`;

const Circle = styled.div<CircleProps>`
  z-index: 10;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 30px;
  background-color: ${(props) => (props.active ? 'red' : props.theme.colors.gray2)};
`;

const Player = ({ className }: ScheduleProps) => {
  const today = new Date();
  const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const todayWeekDay = weekDays[today.getDay()];

  function getDayList() {
    const today = new Date();
    const dayList = [];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dayList.push({
        day: date.getDate(),
        weekDay: weekDays[date.getDay()],
      });
    }

    return dayList;
  }

  const dayList = getDayList();

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  };

  const checkIfCurrent = (starttime: string, endtime: string) => {
    const nowStr = getCurrentTime();
    return nowStr >= starttime && nowStr <= endtime;
  };

  return (
    <Wrapper className={className}>
      <Header>
        <HeaderInnerContainer>
          <HeaderText>{todayWeekDay}</HeaderText>
          <HeaderDateText>{today.toLocaleDateString('ko-KR')}</HeaderDateText>
        </HeaderInnerContainer>
        <MoreText>더보기</MoreText>
      </Header>
      <DayContainer>
        {dayList.map((week, index) => (
          <DayBox key={index}>
            <DayText>{week.weekDay}</DayText>
            <DateText>{week.day}</DateText>
          </DayBox>
        ))}
      </DayContainer>

      <ScheduleContainer>
        {data.map((board, index) => (
          <Content key={index}>
            <Circle active={checkIfCurrent(board.starttime, board.endtime)} />
            <ScheduleText active={checkIfCurrent(board.starttime, board.endtime)}>
              {board.starttime} {board.title}
            </ScheduleText>
          </Content>
        ))}
      </ScheduleContainer>
    </Wrapper>
  );
};

export default Player;
