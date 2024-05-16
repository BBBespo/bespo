import React from 'react';
import styled from 'styled-components';
import userProfile from '../../assets/images/memo/userProfile.png';
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

const Card = () => {
  return (
    <CardContainer>
      <CardMain>
        <p>다리가 너무 아파요...</p>
      </CardMain>

      <CardContent>
        <p>계속 뛰댕기니까 아파요...</p>
      </CardContent>

      <CardInfo>
        <div>
          <UserProfileImg>
            <img src={userProfile} alt="user profile" />
          </UserProfileImg>
          <UserNameText>
            <p>손흥민</p>
          </UserNameText>
          <MemoCreatedDateText>
            <p>2024.04.18 10:34</p>
          </MemoCreatedDateText>
        </div>
        <div>
          <img src={comment} alt="user profile" />
          <CommentCntText>
            <p>2</p>
          </CommentCntText>
        </div>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
