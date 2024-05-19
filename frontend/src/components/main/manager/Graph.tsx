import React from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts';

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
  padding: 5px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  padding-left: 30px;
`;

const HeaderText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

const GraphWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const options = {
  chart: {
    id: '운동강도',
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ['5/10', '5/11', '5/12', '5/13', '5/14', '5/15', '5/16', '5/17'],
  },

  stroke: {
    curve: 'smooth' as const,
  },
  colors: ['#ff0000'],
};

const series = [
  {
    name: '운동강도',
    data: [0, 6, 8, 7, 7, 3, 9],
  },
];

const Graph = ({ className, boardName }: GraphProps) => {
  return (
    <Wrapper className={className}>
      <Header>
        <HeaderText>{boardName}</HeaderText>
      </Header>
      <GraphWapper>
        <Chart options={options} series={series} type="line" width="110%"></Chart>
      </GraphWapper>
    </Wrapper>
  );
};

export default Graph;
