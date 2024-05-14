import React from 'react';
import styled from 'styled-components';

import valueDelete from '../../assets/icons/valueDelete.svg';

const Wrapper = styled.div`
  margin: 0% 5% 0% 5%;
  width: 90%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  margin: 0% 5% 0% 5%;
  height: 100%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  font-size: 18px;
  color: ${(props) => props.theme.colors.black};
  margin-top: 5%;
  margin-bottom: 15%;
  & > p {
    margin: 0px 0;
    font-weight: 600;
  }
`;
const InputWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input<{ hasValue: boolean }>`
  font-family: Pretendard;
  width: 100%;
  font-size: 18px;
  height: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
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

export default function NickName() {
  const [nickname, setNickName] = React.useState('');
  //   const { nickname, setNickName } = userStore();
  //   const navigate = useNavigate();

  //   const onSubmit = () => {
  //     axiosInstance
  //       .put("/api/users/update", {
  //         nickname
  //       })
  //       .then((res: AxiosResponse) => {
  //         console.log(res.data.message);
  //         navigate(url);
  //       })
  //       .catch((error) => {
  //         throw new Error(error.message);
  //       });
  //   };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };
  const hasValue = nickname.trim() !== '';
  return (
    <Wrapper>
      <Contents>
        <Content>
          <p>닉네임을 입력해주세요</p>
        </Content>
        <InputWrapper>
          <Input hasValue={hasValue} placeholder="닉네임 입력" value={nickname} onChange={onChange}></Input>
          {hasValue && <DeleteButton src={valueDelete} alt="값 삭제 버튼" onClick={() => setNickName('')} />}
        </InputWrapper>
        <SubmitButton
          hasValue={hasValue}
          //   onClick={onSubmit}
          disabled={!hasValue}
        >
          저장하기
        </SubmitButton>
      </Contents>
    </Wrapper>
  );
}
