import React from 'react';
import styled from 'styled-components';

interface GraphProps {
  children?: React.ReactNode;
  className?: string;
  boardName?: string;
}

const Wrapper = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  padding: 5px 30px;
`;

const Graph = ({ className }: GraphProps) => {
  return <Wrapper className={className}></Wrapper>;
};

export default Graph;
