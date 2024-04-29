import React from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import DashBoard from '../../components/DashBoard'
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const Main = () => {
  return (
    <MainContainer>
      <Header />
      <DashBoard />
    </MainContainer>
  )
}

export default Main
