import React from 'react';
import styled from 'styled-components';
import Card from '../../components/memo/Card';

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

const Category = () => {
  return (
    <CategoryContainer>
      <CategoryHeader>
        <CategoryNameText>
          <p>고민</p>
        </CategoryNameText>
        <ShowMoreText>
          <p>더보기</p>
        </ShowMoreText>
      </CategoryHeader>

      <CategoryContent>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CategoryContent>
    </CategoryContainer>
  );
};

export default Category;
