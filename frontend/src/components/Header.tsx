import React from 'react';
import styled from 'styled-components';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { GoBellFill } from 'react-icons/go';
import { IoPersonSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #ffffff;
  padding: 20px 50px;

  @media screen and (max-width: 900px) {
    padding: 20px 20px;
  }
`;

const HeaderText = styled.h1`
  font-family: GiantsInline;
  color: #ff0000;
  font-size: 50px;
  margin-right: 10px;

  @media screen and (max-width: 900px) {
    font-size: 30px;
  }
`;

const HeaderManager = styled.div`
  width: 80px;
  height: 20px;
  background-color: #4f4f4f;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  transform: skew(-20deg);

  @media screen and (max-width: 900px) {
    width: 60px;
    height: 15px;
    margin-top: 5px;
  }
`;

const HeaderManagerTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: skew(20deg);
`;

const HeaderManagerText = styled.text`
  font-family: PretendardVariable;
  font-size: 12px;
  color: white;
  font-weight: 600;

  @media screen and (max-width: 900px) {
    font-size: 10px;
  }
`;

const NavigationBar = styled.div`
  flex: 1;
  display: flex;
  direction: row;
  flex-direction: row;
  margin-left: 50px;
  justify-content: start;
  a {
    margin-right: 10px;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const NavigationBarMobile = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    display: flex;
    direction: row;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
    a {
      margin-right: 10px;
    }
  }
`;

const NavigationGap = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
    flex: 1;
  }
`;

const NavigationButton = styled.button`
  border-radius: 50%;
  background-color: white;
  margin-left: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavigationText = styled(NavLink)`
  font-family: PretendardVariable;
  font-size: 20px;
  font-weight: 600;

  &.active {
    color: #ff0000;
  }

  &:hover {
    color: #ff0000;
  }

  @media screen and (max-width: 900px) {
    font-size: 16px;
  }
`;

const HeaderButton = styled.button<{ $type?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.$type === 'red' ? 'red' : 'white')};
  margin-left: 20px;
  margin-top: 5px;
  padding: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 900px) {
    width: 30px;
    height: 30px;
    padding: 2px;
    border-radius: 50%;
    background-color: ${(props) => (props.$type === 'red' ? 'red' : 'white')};
    margin-left: 10px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

const MyHiOutlineUserGroup = styled(HiOutlineUserGroup)`
  color: white;
  font-size: 25px;

  @media screen and (max-width: 900px) {
    font-size: 20px;
  }
`;

const MyGoBellFill = styled(GoBellFill)`
  color: black;
  font-size: 25px;

  @media screen and (max-width: 900px) {
    font-size: 20px;
  }
`;

const MyIoPersonSharp = styled(IoPersonSharp)`
  color: black;
  font-size: 25px;

  @media screen and (max-width: 900px) {
    font-size: 20px;
  }
`;

const Header = () => {
  return (
    <div>
      <HeaderContainer>
        <HeaderText>Bespo</HeaderText>
        <HeaderManager>
          <HeaderManagerTextBox>
            <HeaderManagerText>MANAGER</HeaderManagerText>
          </HeaderManagerTextBox>
        </HeaderManager>
        <NavigationBar>
          <NavigationButton>
            <NavigationText to="/">대시보드</NavigationText>
          </NavigationButton>
          <NavigationButton>
            <NavigationText to="/1">선수단</NavigationText>
          </NavigationButton>
          <NavigationButton>
            <NavigationText to="/2">일정</NavigationText>
          </NavigationButton>
          <NavigationButton>
            <NavigationText to="/memo">메모</NavigationText>
          </NavigationButton>
        </NavigationBar>
        <NavigationGap />
        <HeaderButton $type="red">
          <MyHiOutlineUserGroup />
        </HeaderButton>
        <HeaderButton onClick={() => {}}>
          <MyGoBellFill />
        </HeaderButton>
        <HeaderButton>
          <MyIoPersonSharp />
        </HeaderButton>
      </HeaderContainer>
      <NavigationBarMobile>
        <NavigationButton>
          <NavigationText to="/">대시보드</NavigationText>
        </NavigationButton>
        <NavigationButton>
          <NavigationText to="/1">선수단</NavigationText>
        </NavigationButton>
        <NavigationButton>
          <NavigationText to="/2">일정</NavigationText>
        </NavigationButton>
        <NavigationButton>
          <NavigationText to="/memo">메모</NavigationText>
        </NavigationButton>
      </NavigationBarMobile>
    </div>
  );
};

export default Header;
