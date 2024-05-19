import React, { useState } from 'react';
import styled from 'styled-components';
import { BodyComponent } from 'reactjs-human-body';
import { PartsInput } from 'reactjs-human-body/dist/components/BodyComponent/BodyComponent';
import Edit from '../../assets/icons/Edit_light.png';
import Delete from '../../assets/icons/Close_round_light.png';
import InjurySlider from '../../components/InjurySlider';

import { useNavigate } from 'react-router-dom';
import { instance } from '../../axios/instance';

const BodyMapping: Record<string, string> = {
  head: '머리',
  chest: '가슴',
  stomach: '복부',
  leftShoulder: '오른쪽 어깨',
  rightShoulder: '왼쪽 어깨',
  leftArm: '오른쪽 팔',
  rightArm: '왼쪽 팔',
  leftHand: '오른쪽 손',
  rightHand: '왼쪽 손',
  leftLeg: '오른쪽 다리',
  rightLeg: '왼쪽 다리',
  leftFoot: '오른쪽 발',
  rightFoot: '왼쪽 발',
};

const GetBodyMapping = (name: string) => {
  const iconName = BodyMapping[name];
  return iconName ? iconName : 'unkwnon part';
};

const parts: PartsInput = {
  head: { selected: false },
  leftShoulder: { selected: false },
  rightShoulder: { selected: false },
  leftArm: { selected: false },
  rightArm: { selected: false },
  chest: { selected: false },
  stomach: { selected: false },
  leftLeg: { selected: false },
  rightLeg: { selected: false },
  rightHand: { selected: false },
  leftHand: { selected: false },
  leftFoot: { selected: false },
  rightFoot: { selected: false },
};
const Wrapper = styled.div`
  margin: 1% 5% 0% 5%;
  width: 90%;
  height: 80vh;
  display: flex;
`;

const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  @media (min-width: 901px) {
    flex-direction: row;
    justify-content: space-between;

    & > * {
      width: 50%;
    }
  }
`;

const BodyHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  p {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.black};
  }
`;

const BodyComponentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;

  @media (max-width: 900px) {
    width: 80%;
  }
`;

const PainListWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 100%;

  @media (max-width: 900px) {
    width: 80%;
  }
`;

const PainList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.gray4};
  border-radius: 5px;
  margin-top: 10px;
  padding: 0 10px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 5px;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99000000000;
`;

const ModalDiv = styled.div`
  position: relative;
  width: 30%;
  height: 70%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000000000;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 900px) {
    width: 90%;
    height: 60%;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;

  div {
    width: 18px;
  }

  p {
    font-size: 20px;
    font-weight: 600;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModalButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const ModalButton1 = styled.button`
  width: 48%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.gray4};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.black};
  margin-top: 10px;
`;
const ModalButton2 = styled.button`
  width: 48%;
  height: 40px;
  background-color: ${(props) => props.theme.colors.gray2};
  border: 1px solid ${(props) => props.theme.colors.gray2};
  color: ${(props) => props.theme.colors.gray4};
  border-radius: 5px;
  margin-top: 10px;
`;

const ModalInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 1px solid ${(props) => props.theme.colors.gray4};
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
`;

const PainListSubmitButton = styled(SubmitButton)`
  position: absolute;
  bottom: 10%;

  @media (max-width: 900px) {
    position: relative;
    bottom: 0;
  }
`;

export default function Injury() {
  const [sliderValue, setSliderValue] = useState(0);
  const navigate = useNavigate();
  const handleSliderChange = (value: any) => {
    setSliderValue(value);
  };

  const [bodypart, setBodypart] = useState<string>(''); // 현재작성중인 부위
  const [contact, setContact] = useState<boolean>(true); // 부딪힘여부
  const [modalText, setModalText] = useState<string>(''); // 모달창에 입력한 텍스트
  const [isOpen, setIsOpen] = useState(false);
  const [painList, setPainList] = useState<string[]>([]);
  const [painListDetail, setPainListDetail] = useState<string[]>([]); // 통증리스트 상세정보
  const onChange = (parts: any) => console.log('Changed Parts:', parts);
  const onClick = (id: string) => {
    if (painList.includes(id)) {
      setPainList(painList.filter((item) => item !== id));
    } else {
      setPainList([...painList, id]);
    }
  };
  const modalOpen = () => {
    setIsOpen(true);
  };

  const handleClick = (id: string) => {
    setBodypart(id);
    onClick(id);
    if (!painList.includes(id)) {
      modalOpen();
    }
  };

  function setPartSelected(part: keyof PartsInput, parts: PartsInput): void {
    onClick(part);
    if (parts[part]) {
      if (parts[part].selected) {
        parts[part].selected = false;
      } else {
        parts[part].selected = true;
      }
    }
    console.log(parts);
  }

  function closeModal(id: string, parts: PartsInput) {
    setIsOpen(false);
    setPartSelected(id as keyof PartsInput, parts);
  }

  return (
    <>
      {isOpen && (
        <ModalBackground>
          <ModalDiv>
            <CloseButton src={Delete} onClick={() => closeModal(bodypart as keyof PartsInput, parts)} alt="" />
            <ModalHeader>
              <p>{GetBodyMapping(bodypart)}</p>
            </ModalHeader>
            <InjurySlider slidername="통증 척도" onChange={handleSliderChange} sliderValue={sliderValue} />
            <ModalBody>
              <p>사람/사물에 부딪혀서 생긴 통증인가요?</p>
              <ModalButtonDiv>
                {contact ? (
                  <>
                    <ModalButton1 onClick={() => setContact(true)}>네(접촉)</ModalButton1>
                    <ModalButton2 onClick={() => setContact(false)}>아니요(비접촉)</ModalButton2>
                  </>
                ) : (
                  <>
                    <ModalButton2 onClick={() => setContact(true)}>네(접촉)</ModalButton2>
                    <ModalButton1 onClick={() => setContact(false)}>아니요(비접촉)</ModalButton1>
                  </>
                )}
              </ModalButtonDiv>
            </ModalBody>
            <ModalBody>
              <p>통증이 어떻게 발생했나요?(선택)</p>
              <ModalInput value={modalText} onChange={(e) => setModalText(e.target.value)}></ModalInput>
            </ModalBody>
            <SubmitButton
              onClick={() => {
                console.log('통증정보', bodypart, sliderValue, contact, modalText);
                const data = {
                  injury: {
                    injuryArea: bodypart,
                    injuryLevel: sliderValue,
                    injuryCause: modalText,
                    isContact: contact,
                  },
                };
                instance.post('/injury', data).then((res) => {
                  console.log('통증등록성공', res);
                });
                setPainListDetail([...painListDetail, `${bodypart}: ${sliderValue}, ${contact}, ${modalText}`]);
                setBodypart('');
                setSliderValue(0);
                setContact(true);
                setModalText('');
                setIsOpen(false);
              }}
            >
              입력하기
            </SubmitButton>
          </ModalDiv>
        </ModalBackground>
      )}
      <Wrapper>
        <BodyWrapper>
          <BodyComponentWrapper>
            <BodyHeader>
              <p>통증이 있는 부위를 선택하세요</p>
            </BodyHeader>

            <BodyComponent onChange={onChange} onClick={handleClick} partsInput={parts} />
          </BodyComponentWrapper>
          <PainListWrapper>
            <p>통증리스트</p>
            {painList.map(
              (id, index) =>
                id && (
                  <PainList key={index}>
                    <p>{GetBodyMapping(id)}</p>
                    <IconDiv>
                      <img src={Edit} onClick={() => setIsOpen(true)} alt="" />
                      <img src={Delete} onClick={() => setPartSelected(id as keyof PartsInput, parts)} alt="" />
                    </IconDiv>
                  </PainList>
                ),
            )}

            <PainListSubmitButton
              onClick={() => {
                navigate('/');
              }}
            >
              제출하기
            </PainListSubmitButton>
          </PainListWrapper>
        </BodyWrapper>
      </Wrapper>
    </>
  );
}
