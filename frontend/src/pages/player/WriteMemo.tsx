import React, { useState } from 'react';
import styled from 'styled-components';
import { instance } from 'src/axios/instance';
// import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const MemoContainer = styled.div`
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

const IntroText = styled.div`
  margin-bottom: 20px;
  > p {
    color: ${(props) => props.theme.colors.gray5};
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

const Button = styled.button<{ clicked: boolean }>`
  background-color: ${(props) => (props.clicked ? props.theme.colors.gray3 : 'white')};
  color: ${(props) => (props.clicked ? props.theme.colors.black : props.theme.colors.gray3)};
  border: 1px solid ${(props) => props.theme.colors.gray3};
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 14px;
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

export default function WriteMemo() {
  const [memoType, setMemoType] = useState('WORRY');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isClickedPlayer, setIsClickedPlayer] = useState(false);
  const [isClickedManager, setIsClickedManager] = useState(false);
  const [isClickedCoach, setIsClickedCoach] = useState(false);
  const [isClickedCaptain, setIsClickedCaptain] = useState(false);

  const navigate = useNavigate();

  const handleMemoTypeButtonClick = (memoType: string) => {
    setMemoType(memoType);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmitBtnClick = () => {
    const receivers =
      `${isClickedPlayer ? 'Player ' : ''}${isClickedManager ? 'Manager ' : ''}${isClickedCoach ? 'Coach ' : ''}${isClickedCaptain ? 'Captain ' : ''}`.trim();
    console.log(receivers);

    instance
      .post('/memos', {
        name: name,
        content: description,
        type: memoType,
        scope: receivers,
      })
      .then(() => {
        navigate('/memo-list');
      });
  };

  return (
    <MemoContainer>
      <HeadText>
        <p>메모 작성</p>
      </HeadText>
      <IntroText>
        <p>
          전달할 메모가 있으신가요? <br />
          남기고 싶은 메모를 작성해주세요.
        </p>
      </IntroText>

      <InputBox>
        <InputText>
          <p>메모를 보낼 상대를 검색해주세요.</p>
        </InputText>
        <Button clicked={isClickedPlayer === true} onClick={() => setIsClickedPlayer(!isClickedPlayer)}>
          선수
        </Button>
        <Button clicked={isClickedManager === true} onClick={() => setIsClickedManager(!isClickedManager)}>
          관리자
        </Button>
        <Button clicked={isClickedCoach === true} onClick={() => setIsClickedCoach(!isClickedCoach)}>
          코치
        </Button>
        <Button clicked={isClickedCaptain === true} onClick={() => setIsClickedCaptain(!isClickedCaptain)}>
          주장
        </Button>
      </InputBox>

      <InputBox>
        <InputText>
          <p>메모 종류를 선택해주세요.</p>
        </InputText>
        <Button clicked={memoType === 'WORRY'} onClick={() => handleMemoTypeButtonClick('WORRY')}>
          고민
        </Button>
        <Button clicked={memoType === 'TRAINING'} onClick={() => handleMemoTypeButtonClick('TRAINING')}>
          훈련
        </Button>
        <Button clicked={memoType === 'INJURY'} onClick={() => handleMemoTypeButtonClick('INJURY')}>
          부상
        </Button>
        <Button clicked={memoType === 'ETC'} onClick={() => handleMemoTypeButtonClick('ETC')}>
          기타
        </Button>
      </InputBox>

      <InputBox>
        <InputText>
          <p>제목을 입력해주세요.</p>
        </InputText>
        <Input value={name} onChange={handleNameChange} />
      </InputBox>

      <InputBox>
        <InputText>
          <p>설명을 입력해주세요.</p>
        </InputText>
        <TextAreaInput value={description} onChange={handleDescriptionChange} />
      </InputBox>

      <SubmitButton onClick={handleSubmitBtnClick}>작성하기</SubmitButton>
    </MemoContainer>
  );
}
