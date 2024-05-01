import React from 'react'
import styled from 'styled-components'
// import DashBoard from '../../components/DashBoard'
import NoTeam from '../../components/JoinTeam/NoTeam'
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 5vh;
`
const Main = () => {
  return (
    <MainContainer>
      {/* <DashBoard /> */}
      <NoTeam />
    </MainContainer>
  )
}

export default Main
