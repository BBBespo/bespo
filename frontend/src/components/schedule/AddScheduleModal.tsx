import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import search from '../../assets/images/schedule/search.png';
import close from '../../assets/images/schedule/close.png';
import { instance } from 'src/axios/instance';
// import { AxiosResponse } from 'axios';

const AddScheduleModalContainer = styled.div`
  width: 35%;
  height: auto;
  padding: 4vh;
  border-radius: 5px;
  background-color: #f3f3f3;
  z-index: 100;
`;

const ModalHead = styled.div`
  text-align: center;
  > p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button<{ clicked: boolean }>`
  background-color: ${(props) => (props.clicked ? '#FF0000' : '#f3f3f3')};
  color: ${(props) => (props.clicked ? '#f3f3f3' : '#FF0000')};
  border: 1px solid #ff0000;
  border-radius: 15px;
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

const QuestionText = styled.div`
  margin-bottom: 5px;
  > p {
    font-size: 14px;
  }
`;

const QuestionBox = styled.div`
  margin-bottom: 15px;
`;

const DatePickerBox = styled.div`
  display: flex;
  align-items: center;
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

const CustomDatePicker: React.FC<ReactDatePickerProps> = ({ customInput, ...props }) => {
  return (
    <DatePicker customInput={<Input {...(customInput as React.InputHTMLAttributes<HTMLInputElement>)} />} {...props} />
  );
};

const ReceiverBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Receiver = styled.div`
  background-color: ${(props) => props.theme.colors.gray3};
  border-radius: 15px;
  padding: 3px 8px;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 12px;
`;

const CloseButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

const AddScheduleModal = ({ onClose, getEventsList }: { onClose: () => void; getEventsList: () => void }) => {
  const [scheduleType, setScheduleType] = useState('훈련');
  const [scheduleName, setScheduleName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverList, setReceiverList] = useState<string[]>([]);

  const handleButtonClick = (type: string) => {
    setScheduleType(type);
  };

  const handleSearchBtnClick = () => {
    if (receiver.trim() !== '') {
      // 새로운 배열을 생성하여 receiverList 상태를 업데이트
      setReceiverList((prevList) => [...prevList, receiver]);
      // receiver 상태를 초기화
      setReceiver('');
    }
  };

  const handleDeleteBtnClick = (index: number) => {
    return () => {
      // 클릭된 수신자를 receiverList에서 제거
      setReceiverList((prevList) => prevList.filter((_, i) => i !== index));
    };
  };

  const handleSubmitBtnClick = () => {
    const requestBody = {
      start: '2024-05-18T12:00:00',
      end: '2024-05-20T12:00:00',
      title: scheduleName,
      content: description,
      type: scheduleType,
      location: location,
      attendees: ['차승윤', '박태양'],
    };
    instance.post('/events', requestBody).then(() => {
      onClose();
      getEventsList();
    });
  };

  return (
    <AddScheduleModalContainer>
      <CloseButtonBox>
        <img src={close} onClick={onClose} alt="close" style={{ width: '17px', height: '17px', cursor: 'pointer' }} />
      </CloseButtonBox>
      <ModalHead>
        <p>일정 추가하기</p>
      </ModalHead>

      <ButtonGroup>
        <Button clicked={scheduleType === 'TRAINING'} onClick={() => handleButtonClick('TRAINING')}>
          훈련
        </Button>
        <Button clicked={scheduleType === 'PRACTICE'} onClick={() => handleButtonClick('PRACTICE')}>
          연습 경기
        </Button>
        <Button clicked={scheduleType === 'MATCH'} onClick={() => handleButtonClick('MATCH')}>
          경기
        </Button>
        <Button clicked={scheduleType === 'ETC'} onClick={() => handleButtonClick('ETC')}>
          기타
        </Button>
      </ButtonGroup>

      <QuestionBox>
        <QuestionText>일정 이름을 입력해주세요.*</QuestionText>
        <Input
          value={scheduleName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setScheduleName(e?.target.value);
          }}
        />
      </QuestionBox>

      <QuestionBox>
        <QuestionText> 시작/종료 시간을 입력해주세요.*</QuestionText>
        <DatePickerBox>
          <div style={{ marginRight: '10px' }}>
            <CustomDatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />{' '}
          </div>
          <CustomDatePicker
            selected={startTime}
            onChange={(time: Date) => setStartTime(time)}
            showTimeSelect
            showTimeSelectOnly
            dateFormat="h:mm aa"
            timeCaption="Start Time"
          />
          <div style={{ margin: '0 10px 0 10px' }}> ~ </div>
          <CustomDatePicker
            selected={endTime}
            onChange={(time: Date) => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            dateFormat="h:mm aa"
            timeCaption="End Time"
          />
        </DatePickerBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionText>위치를 입력해주세요.*</QuestionText>
        <Input
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLocation(e?.target.value);
          }}
        />
      </QuestionBox>

      <QuestionBox>
        <QuestionText>일정 설명을 입력해주세요.*</QuestionText>
        <Input
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e?.target.value);
          }}
        />
      </QuestionBox>

      <QuestionBox>
        <QuestionText>참가 대상을 선택해주세요.*</QuestionText>
        <div style={{ position: 'relative' }}>
          <Input
            value={receiver}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setReceiver(e?.target.value);
            }}
            style={{ paddingRight: '30px' }}
          />
          <img
            src={search}
            onClick={handleSearchBtnClick}
            alt="search"
            style={{
              position: 'absolute',
              top: '50%',
              right: '5px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              width: '30px',
            }}
          />
        </div>
        <ReceiverBox>
          {receiverList.map((receiver, index) => (
            <Receiver key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>{receiver}</div>
                <img src={close} onClick={handleDeleteBtnClick(index)} alt="delete" style={{ cursor: 'pointer' }} />
              </div>
            </Receiver>
          ))}
        </ReceiverBox>
      </QuestionBox>

      <SubmitButton onClick={handleSubmitBtnClick}>일정 추가하기</SubmitButton>
    </AddScheduleModalContainer>
  );
};

export default AddScheduleModal;
