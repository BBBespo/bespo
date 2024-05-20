import React, { useEffect } from 'react';
import styled from 'styled-components';
// import data from '../../../services/dummy/conditionPlayer';
import None from '../../../assets/images/player/None.png';

import useStore from '../../../store/userStore';
import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';
interface BoardType {
  name: string;
  createDate: string;
  image?: string; // optional image property
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

const PlayerImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
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
  width: 100%;
  > p {
    margin-top: 3px;
  }
`;

const ContentTextInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 12px;
`;

const formatDate = (dateString: string) => {
  return dateString.substring(0, 10); // 슬라이싱하여 "YYYY-MM-DD" 형식으로 변환
};

const Player = ({ boardName, className }: Board1Props) => {
  const teamId = useStore((state) => state.team?.teamId);
  const [listData, setListData] = React.useState<BoardType[]>([]);
  useEffect(() => {
    instance.get(`/status?teamId=${teamId}`).then((res: AxiosResponse) => {
      console.log(res.data.data);
      setListData(res.data.data);
    });
  }, []);
  return (
    <Wrapper className={className}>
      <Header>
        <HeaderText>{boardName}</HeaderText>
        <MoreText>더보기</MoreText>
      </Header>

      {listData.slice(0, 3).map((board, index) => (
        <Content key={index}>
          {board.image ? <PlayerImg src={board.image} alt="player" /> : <PlayerImg src={None} alt="player" />}
          <ContentText>
            <p>{board.name}</p>
            <ContentTextInner>
              <p>{formatDate(board.createDate)}</p>
            </ContentTextInner>
          </ContentText>
        </Content>
      ))}
    </Wrapper>
  );
};

export default Player;