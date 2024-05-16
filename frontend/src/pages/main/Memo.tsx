import Category from '../../components/memo/Category';
import React from 'react';
import styled from 'styled-components';

const MemoContainer = styled.div`
  width: auto;
  height: 100vh;
  padding: 0 5vh;
`;

const Memo = () => {
  return (
    <MemoContainer>
      <Category memoType="WORRY" categoryName="고민" />
      <Category memoType="TRAINING" categoryName="훈련" />
      <Category memoType="INJURY" categoryName="부상" />
      <Category memoType="ETC" categoryName="기타" />
    </MemoContainer>
  );
};

export default Memo;
