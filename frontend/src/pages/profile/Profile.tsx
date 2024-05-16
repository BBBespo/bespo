import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import kakao from '../../assets/images/profile/kakao.png';
import teamDefaultProfile from '../../assets/images/createTeam/teamDefaultProfile.png';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  padding: 5px 15px 15px 15px;
`;

const HeadText = styled.div`
  text-align: center;
  margin-bottom: 15px;
  > p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  > p {
    font-size: 18px;
    font-weight: bold;
  }
`;

const UpdateProfileButton = styled.button`
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.colors.red};
  color: #f3f3f3;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  margin-bottom: 15px;
`;

const ProfileInfoBox = styled.div`
  margin-bottom: 15px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 5px;
  padding: 10px;
`;

const ProfileInfoContentBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileInfoText = styled.div`
  margin-bottom: 10px;
  > p {
    color: ${(props) => props.theme.colors.gray5};
  }
`;

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    setProfile('https://bespo.s3.ap-northeast-2.amazonaws.com/teamImage/bm.png');
    setUserName('박태양');
    setEmail('sun@kakao.com');
    setTeamName('짜이원짜이');
  }, []);

  return (
    <ProfileContainer>
      <HeadText>
        <p>프로필</p>
      </HeadText>

      <ImageBox>
        <img src={profile} style={{ width: '50px', height: '50px', borderRadius: '50px', marginRight: '8px' }} />
        <p>{userName}</p>
      </ImageBox>
      <UpdateProfileButton onClick={() => navigate('/edit-profile')}>프로필 수정</UpdateProfileButton>

      <ProfileInfoBox>
        <ProfileInfoText>
          <p>연결된 계정</p>
        </ProfileInfoText>
        <ProfileInfoContentBox>
          <img src={kakao} style={{ width: '40px', height: '40px', borderRadius: '50px', marginRight: '8px' }} />
          <p>{email}</p>
        </ProfileInfoContentBox>
      </ProfileInfoBox>

      <ProfileInfoBox>
        <ProfileInfoText>
          <p>팀</p>
        </ProfileInfoText>
        <ProfileInfoContentBox>
          <img
            src={teamDefaultProfile}
            style={{ width: '40px', height: '40px', borderRadius: '50px', marginRight: '8px' }}
          />
          <p>{teamName}</p>
        </ProfileInfoContentBox>
      </ProfileInfoBox>
    </ProfileContainer>
  );
}
