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
      <Category />
      <Category />
      <Category />
    </MemoContainer>
  );
};

export default Memo;
