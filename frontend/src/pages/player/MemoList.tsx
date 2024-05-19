import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import comment from '../../assets/images/memo/comment_light.png';
import edit from '../../assets/images/memo/edit.png';
import { useNavigate } from 'react-router';
import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

const MemoContainer = styled.div`
  padding: 5px 15px 15px 15px;
`;

const HeadText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 15px;

  > p {
    font-size: 20px;
    font-weight: bold;
    flex-grow: 1;
    text-align: center;
  }

  > img {
    position: absolute;
    right: 0;
  }
`;

const MemoInfoBox = styled.div`
  margin-bottom: 15px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 5px;
  padding: 10px;
`;

const MemoCreatedDateText = styled.div`
  margin-bottom: 10px;
  > p {
    color: ${(props) => props.theme.colors.gray5};
  }
`;

const MemoContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemoCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function MemoList() {
  const navigate = useNavigate();
  const [list, setList] = useState<List[]>([]);

  interface List {
    memoId: number;
    name: string;
    content: string;
    type: string;
    scope: string;
    writerName: string;
    writerImgUrl: string;
    createdAt: string;
    commentSize: number;
  }

  useEffect(() => {
    instance
      .get('/memos', {
        params: {
          memoType: 'MY',
        },
      })
      .then((res: AxiosResponse) => {
        setList(res.data.data);
      });
  }, []);

  const handleItemClick = (memoId: number) => {
    navigate(`/memo/${memoId}`);
  };

  return (
    <MemoContainer>
      <HeadText>
        <p>메모 목록</p>
        <img src={edit} alt="edit" onClick={() => navigate('/write-memo')} />
      </HeadText>

      {list.map((item, index) => (
        <MemoInfoBox key={index} onClick={() => handleItemClick(item.memoId)}>
          <MemoCreatedDateText>
            <p>{item.createdAt.split('T')[0]}</p>
          </MemoCreatedDateText>
          <MemoContentBox>
            <div>{item.name}</div>
            <MemoCommentBox>
              <img src={comment} alt="comment" />
              <p>{item.commentSize}</p>
            </MemoCommentBox>
          </MemoContentBox>
        </MemoInfoBox>
      ))}
    </MemoContainer>
  );
}
