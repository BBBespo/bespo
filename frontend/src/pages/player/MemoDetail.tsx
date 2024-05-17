import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
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
`;

const MemoCreatedDateBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MemoCreatedDateText = styled.div`
  margin-bottom: 5px;
  > p {
    color: ${(props) => props.theme.colors.gray5};
  }
`;

const ItemBox = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const Item = styled.div`
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  margin-right: 5px;
  padding: 5px 10px 5px 10px;
  background-color: ${(props) => props.theme.colors.gray2};
  font-size: 14px;
`;

const ContentBox = styled.div`
  font-weight: bold;
`;

export default function MemoDetail() {
  const { id } = useParams();
  const [createdAt, setCreatedAt] = useState('');
  const [content, setContent] = useState('');
  const [scope, setScope] = useState('');
  const [type, setType] = useState('');

  const typeMap: any = {
    WORRY: '고민',
    INJURY: '부상',
    TRAINING: '훈련',
    ETC: '기타',
  };

  const ItemMap: any = {
    COACH: '코치',
    PLAYER: '선수',
    MANAGER: '감독',
    CAPTAIN: '주장',
  };

  const handleDeleteButton = () => {
    // instance
    //   .delete(`/memos`, {
    //     headers: {
    //       memoId: id,
    //     },
    //   })
    //   .then(() => {});
  };

  useEffect(() => {
    instance
      .get(`/memos/${id}`)
      .then((response: AxiosResponse) => {
        console.log(response.data.data);
        setCreatedAt(response.data.data.createdAt);
        setContent(response.data.data.content);
        setScope(response.data.data.scope);
        setType(typeMap[response.data.data.type]);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, []);

  return (
    <MemoContainer>
      <HeadText>
        <p>메모</p>
      </HeadText>

      <MemoCreatedDateBox style={{ display: 'flex' }}>
        <MemoCreatedDateText>
          <p>{createdAt.split('T')[0]}</p>
        </MemoCreatedDateText>
        <div onClick={handleDeleteButton}>삭제</div>
      </MemoCreatedDateBox>

      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{type} 메모입니다.</div>

      <ItemBox>
        {scope.split(' ').map((item, index) => (
          <Item key={index}>{ItemMap[item]}</Item>
        ))}
      </ItemBox>

      <ContentBox>{content}</ContentBox>
    </MemoContainer>
  );
}
