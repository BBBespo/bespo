import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../../components/memo/Card';
import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

const CategoryContainer = styled.div`
  width: auto;
  height: auto;
  padding: 2vh 5vh;
  margin-bottom: 35px;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CategoryNameText = styled.div`
  > p {
    font-size: 20px;
    font-weight: 600;
  }
`;

const ShowMoreText = styled.div`
  > p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray3};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

interface List {
  memoId: number;
  name: string;
  content: string;
  type: string;
  image: string;
  scope: string;
  writerName: string;
  writerImgUrl: string;
  createdAt: string;
  commentSize: number;
}

type CategoryProps = {
  memoType: string;
  categoryName: string;
};

const Category: React.FC<CategoryProps> = ({ memoType, categoryName }) => {
  const [list, setList] = useState<List[]>([]);

  useEffect(() => {
    instance
      .get('/memos', {
        params: {
          memoType: memoType,
        },
      })
      .then((res: AxiosResponse) => {
        setList(res.data.data);
      });
  }, []);

  return (
    <CategoryContainer>
      <CategoryHeader>
        <CategoryNameText>
          <p>{categoryName}</p>
        </CategoryNameText>
        <ShowMoreText>
          <p>더보기</p>
        </ShowMoreText>
      </CategoryHeader>

      <CategoryContent>
        {list.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            content={item.content}
            writerName={item.writerName}
            writerImgUrl={item.writerImgUrl}
            createdAt={item.createdAt}
            commentSize={item.commentSize}
          />
        ))}
      </CategoryContent>
    </CategoryContainer>
  );
};

export default Category;
