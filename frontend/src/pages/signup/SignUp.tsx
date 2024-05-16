import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import defaultProfile from '../../assets/images/defaultProfile.png';

import valueDelete from '../../assets/icons/valueDelete.svg';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { instance } from 'src/axios/instance';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  margin: 0% 5% 0% 5%;
  width: 90%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  & > p {
    margin: 0px 0;
    font-weight: 600;
  }
`;

const ProfileImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const FileUploadButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const FileUploadButton = styled.div`
  text-align: center;
  border: 1.5px solid ${(props) => props.theme.colors.gray3};
  width: fit-content;
  padding: 5px 15px 5px 15px;
  border-radius: 3px;
  font-size: 14px;
`;

const ChangeToDefaultImageTextBox = styled.div`
  text-align: center;
  font-size: 10px;
  text-decoration: underline;
  color: ${(props) => props.theme.colors.gray3};
  margin-top: 5px;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  position: relative;
  height: auto;
  margin-bottom: 2rem;
  width: 100%;
`;

const Input = styled.input<{ hasValue: boolean }>`
  font-family: Pretendard;
  width: 100%;
  font-size: 14px;
  height: 40px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-color: ${(props) => (props.hasValue ? props.theme.colors.black : props.theme.colors.gray3)};
  border-bottom-width: 1px;

  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.img`
  position: absolute;
  cursor: pointer;
  right: 1%;
  top: 46%;
`;

const SubmitButton = styled.button<{ hasValue: boolean }>`
  width: 100%;
  height: 50px;
  color: white;
  border-radius: 10px;
  background-color: ${(props) => (props.hasValue ? 'red' : props.theme.colors.gray3)};
  border: none;
`;

const CustomDatePicker: React.FC<ReactDatePickerProps> = ({ customInput, ...props }) => {
  return (
    <DatePicker
      customInput={<Input hasValue={true} {...(customInput as React.InputHTMLAttributes<HTMLInputElement>)} />}
      {...props}
    />
  );
};

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [birth, setBirth] = useState(new Date());
  const [profile, setProfile] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(defaultProfile);
  const imageRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const requestBody = new FormData();
  const jsonSignUpData = JSON.stringify({
    email: email,
    name: name,
    weight: weight,
    height: height,
    birth: birth,
    tel: tel,
  });
  const info = new Blob([jsonSignUpData], { type: 'application/json' });
  requestBody.append('request', info);
  if (profile) requestBody.append('image', profile);
  const onSubmit = () => {
    instance
      .post('/members/signup', requestBody, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigate('/');
      });
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'email':
        setEmail(e.currentTarget.value);
        break;
      case 'tel':
        setTel(e.currentTarget.value);
        break;
      case 'weight':
        setWeight(e.currentTarget.value);
        break;
      case 'height':
        setHeight(e.currentTarget.value);
        break;
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
    }
  };
  const setToTeamDefaultProfile = () => {
    if (imageRef.current) {
      imageRef.current.value = '';
      setSelectedFile(defaultProfile);
      setProfile(null);
    }
  };
  const hasValueName = name.trim() !== '';
  const hasValueEmail = email.trim() !== '';
  const hasValueTel = tel.trim() !== '';
  const hasValueWeight = weight.trim() !== '';
  const hasValueHeight = height.trim() !== '';
  return (
    <Wrapper>
      {selectedFile && (
        <ProfileImageBox>
          <img src={selectedFile.toString()} style={{ width: '70px', height: '70px', borderRadius: '50px' }} />
        </ProfileImageBox>
      )}
      <FileUploadButtonBox>
        <FileUploadButton>
          <label htmlFor="fileInput" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            프로필 사진 업로드
          </label>
        </FileUploadButton>
        <input ref={imageRef} type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
      </FileUploadButtonBox>
      <Contents>
        <ChangeToDefaultImageTextBox>
          <div onClick={setToTeamDefaultProfile}>기본 이미지로 변경</div>
        </ChangeToDefaultImageTextBox>
        <Content>
          <p>이름을 입력해주세요</p>
        </Content>
        <InputWrapper>
          <Input name="name" hasValue={hasValueName} placeholder="이름 입력" value={name} onChange={onChange}></Input>
          {hasValueName && <DeleteButton src={valueDelete} alt="값 삭제 버튼" onClick={() => setName('')} />}
        </InputWrapper>
        <Content>
          <p>이메일을 입력해주세요</p>
        </Content>
        <InputWrapper>
          <Input
            name="email"
            hasValue={hasValueEmail}
            placeholder="이메일 입력"
            value={email}
            onChange={onChange}
          ></Input>
          {hasValueEmail && <DeleteButton src={valueDelete} alt="값 삭제 버튼" onClick={() => setEmail('')} />}
        </InputWrapper>
        <Content>
          <p>전화번호를 입력해주세요</p>
        </Content>
        <InputWrapper>
          <Input name="tel" hasValue={hasValueTel} placeholder="전화번호 입력" value={tel} onChange={onChange}></Input>
          {hasValueTel && <DeleteButton src={valueDelete} alt="값 삭제 버튼" onClick={() => setTel('')} />}
        </InputWrapper>
        <Content>
          <p>생년월일을 입력해주세요</p>
        </Content>
        <InputWrapper>
          <CustomDatePicker selected={birth} onChange={(date: Date) => setBirth(date)} />{' '}
        </InputWrapper>
        <Content>
          <p>몸무게를 입력해주세요</p>
        </Content>
        <InputWrapper>
          <Input
            name="weight"
            hasValue={hasValueWeight}
            placeholder="몸무게 입력"
            value={weight}
            onChange={onChange}
          ></Input>
          {hasValueWeight && <DeleteButton src={valueDelete} alt="값 삭제 버튼" onClick={() => setWeight('')} />}
        </InputWrapper>
        <Content>
          <p>신장을 입력해주세요</p>
        </Content>
        <InputWrapper>
          <Input
            name="height"
            hasValue={hasValueHeight}
            placeholder="신장 입력"
            value={height}
            onChange={onChange}
          ></Input>
          {hasValueHeight && <DeleteButton src={valueDelete} alt="값 삭제 버튼" onClick={() => setHeight('')} />}
        </InputWrapper>
        <SubmitButton
          hasValue={hasValueName && hasValueEmail && hasValueTel && hasValueWeight && hasValueHeight}
          onClick={onSubmit}
          disabled={!(hasValueName && hasValueEmail && hasValueTel && hasValueWeight && hasValueHeight)}
        >
          저장하기
        </SubmitButton>
      </Contents>
    </Wrapper>
  );
}
