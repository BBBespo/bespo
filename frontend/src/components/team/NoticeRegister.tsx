import React, { useState } from 'react';
import styled from 'styled-components';
import { instance } from 'src/axios/instance';
// import { AxiosResponse } from 'axios';
import { AxiosResponse } from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px;
  flex: 1;
  gap: 3rem;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;
const HeadText = styled.div`
  text-align: center;
  margin-bottom: 15px;
  > p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const InputBox = styled.div`
  margin-bottom: 20px;
`;

const InputText = styled.div`
  margin-bottom: 8px;
  > p {
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    outline: none;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    outline: none;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.red};
  color: #f3f3f3;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 14px;
`;

const NoticeRegister = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmitBtnClick = () => {
    const jsonData = JSON.stringify({
      title: title,
      text: text,
    });

    const notice = new Blob([jsonData], { type: 'application/json' });
    const formData = new FormData();
    formData.append('request', notice);

    instance
      .post('/notices', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        alert('공지가 작성되었습니다.');
        setTitle('');
        setText('');
      });
  };
  return (
    <Wrapper>
      <HeadText>
        <p>공지 작성</p>
      </HeadText>
      <InputBox>
        <InputText>
          <p>제목을 입력해주세요.</p>
        </InputText>
        <Input value={title} onChange={handleNameChange} />
      </InputBox>

      <InputBox>
        <InputText>
          <p>내용을 입력해주세요.</p>
        </InputText>
        <TextAreaInput value={text} onChange={handleDescriptionChange} />
      </InputBox>

      <SubmitButton onClick={handleSubmitBtnClick}>작성하기</SubmitButton>
    </Wrapper>
  );
};

export default NoticeRegister;
