import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { instance } from 'src/axios/instance';
import { AxiosResponse } from 'axios';

const EditProfileContainer = styled.div`
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

const EditButtonBox = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
  > p {
    font-weight: bold;
  }
`;

const ProfileImageBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
`;

const InputText = styled.div`
  margin-bottom: 10px;
  > p {
    color: ${(props) => props.theme.colors.gray5};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    outline: none;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

export default function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [backNumber, setBackNumber] = useState(0);
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    instance.get('/members').then((res: AxiosResponse) => {
      setProfile(res.data.data.imgUrl);
      setName(res.data.data.name);
      setBirthDate(res.data.data.birth);
      setPhone(res.data.data.tel);
      setBackNumber(res.data.data.backNumber);
      setPosition(res.data.data.role);
      setEmail(res.data.data.email);
      setWeight(res.data.data.weight);
      setHeight(res.data.data.height);
    });
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleBackNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setBackNumber(value);
  };

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value);
  };

  const handleEditButton = () => {
    const requestBody = new FormData();
    const jsonEditData = JSON.stringify({
      email: email,
      name: name,
      role: position,
      weight: weight,
      height: height,
      birth: birthDate,
      tel: phone === null ? '' : phone,
      backNumber: backNumber,
    });
    const data = new Blob([jsonEditData], { type: 'application/json' });
    requestBody.append('request', data);

    instance
      .put('/members/update', requestBody, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigate('/profile');
      });
  };

  return (
    <EditProfileContainer>
      <HeadText>
        <p>프로필 수정</p>
      </HeadText>

      <EditButtonBox>
        <button onClick={handleEditButton}>
          <p>완료</p>
        </button>
      </EditButtonBox>

      <ProfileImageBox>
        <img src={profile} style={{ width: '100px', height: '100px', borderRadius: '50px' }} />
      </ProfileImageBox>

      <InputBox>
        <InputText>
          <p>이름</p>
        </InputText>
        <Input type="text" value={name} onChange={handleNameChange} />
      </InputBox>

      <InputBox>
        <InputText>
          <p>생년월일</p>
        </InputText>
        <Input type="text" value={birthDate} onChange={handleBirthDateChange} />
      </InputBox>

      <InputBox>
        <InputText>
          <p>전화번호</p>
        </InputText>
        <Input type="text" value={phone} onChange={handlePhoneChange} />
      </InputBox>

      <InputBox>
        <InputText>
          <p>등번호</p>
        </InputText>
        <Input type="number" value={backNumber} onChange={handleBackNumberChange} />
      </InputBox>

      <InputBox>
        <InputText>
          <p>역할</p>
        </InputText>
        <Input type="text" value={position} onChange={handlePositionChange} />
      </InputBox>
    </EditProfileContainer>
  );
}
