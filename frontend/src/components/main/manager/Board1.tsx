import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

interface BoardType {
  title: string;
  createdAt: string;
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

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.gray4};
`;

function monthday(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}

const Board1 = ({ boardName, className }: Board1Props) => {
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    instance
      .get(`/${className}`)
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setBoards(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching notices:', error.message);
      });
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때만 실행

  return (
    <Wrapper className={className}>
      <Header>
        <HeaderText>{boardName}</HeaderText>
        <MoreText>더보기</MoreText>
      </Header>

      {boards.slice(0, 2).map((board, index) => (
        <Content key={index}>
          <p>{board.title}</p>
          <p>{monthday(board.createdAt)}</p>
        </Content>
      ))}
    </Wrapper>
  );
};

export default Board1;
