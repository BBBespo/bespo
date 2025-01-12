import React from 'react';
import styled from 'styled-components';
import data from '../../../services/dummy/injuryPlayer';

interface BoardType {
  title: string;
  date: string;
}

interface Board1Props {
  children?: React.ReactNode;
  className?: string;
  boardName?: string;
  boards?: BoardType[];
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
  width: 100%;
  margin-bottom: 20px;
  margin-top: 15px;
`;

const HeaderText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

const MoreText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
  text-decoration: underline;
  text-underline-offset: 5px;
  cursor: pointer;
`;

// const PlayerPic = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   margin-right: 20px;
// `;

const NonePlayerPic = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: red;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    margin-top: 3px;
  }
`;

const Player = ({ boardName, className }: Board1Props) => {
  return (
    <Wrapper className={className}>
      <Header>
        <HeaderText>{boardName}</HeaderText>
        <MoreText>더보기</MoreText>
      </Header>

      {data.map((board, index) => (
        <Content key={index}>
          <NonePlayerPic></NonePlayerPic>
          <ContentText>
            <p>{board.name}</p>
            <p>{board.date}</p>
          </ContentText>
        </Content>
      ))}
    </Wrapper>
  );
};

export default Player;
