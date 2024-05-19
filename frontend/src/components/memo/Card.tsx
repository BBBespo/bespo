import React from 'react';
import styled from 'styled-components';
import comment from '../../assets/images/memo/comment_light.png';

const CardContainer = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: auto;
  margin: 0px 15px 0px 0px;
  padding: 10px;
  border: 1px #ababab solid;
  border-radius: 5px;
  cursor: pointer;
`;

const CardMain = styled.div`
  display: flex;
  margin-bottom: 5px;
  > p {
    font-weight: 600;
    font-size: 14px;
  }
`;

const CardContent = styled.div`
  margin-bottom: 30px;
  > p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray4};
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
`;

const UserProfileImg = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
`;

const UserNameText = styled.div`
  > p {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const MemoCreatedDateText = styled.div`
  > p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray4};
  }
`;

const CommentCntText = styled.div`
  > p {
    font-size: 14px;
  }
`;

type Item = {
  name: string;
  content: string;
  writerName: string;
  writerImgUrl: string;
  createdAt: string;
  commentSize: number;
};

const Card: React.FC<Item> = ({ name, content, writerName, writerImgUrl, createdAt, commentSize }) => {
  return (
    <CardContainer>
      <CardMain>
        <p>{name}</p>
      </CardMain>

      <CardContent>
        <p>{content.slice(0, 8) + '...'}</p>
      </CardContent>

      <CardInfo>
        <div>
          <UserProfileImg>
            <img src={writerImgUrl} alt="user profile" style={{ borderRadius: '50px' }} />
          </UserProfileImg>
          <UserNameText>
            <p>{writerName}</p>
          </UserNameText>
          <MemoCreatedDateText>
            <p>{createdAt.split('T')[0]}</p>
          </MemoCreatedDateText>
        </div>
        <div>
          <img src={comment} alt="user profile" />
          <CommentCntText>
            <p>{commentSize}</p>
          </CommentCntText>
        </div>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
