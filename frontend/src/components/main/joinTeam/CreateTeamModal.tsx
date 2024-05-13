import React, { useState } from 'react';
import styled from 'styled-components';
import close from '../../../assets/images/schedule/close.png';
import teamDefaultProfile from '../../../assets/images/createTeam/teamDefaultProfile.png';
import teamProfileEx from '../../../assets/images/createTeam/teamProfileEx.png';

const CreateTeamModalContainer = styled.div`
  width: 30%;
  height: auto;
  padding: 4vh;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CloseButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

const ModalHead = styled.div`
  text-align: center;
  > p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
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
  margin-top: 7px;
`;

const TeamNameInputBox = styled.div`
  margin-top: 30px;
`;

const TeamNameInput = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
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

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.red};
  color: #f3f3f3;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 15px;
  margin-right: 10px;
  font-size: 14px;
`;

const CreateTeamModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [teamName, setTeamName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      } else {
        setSelectedFile(null);
      }
    }
  };

  const handleOtherFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    } else {
      formData.append('file', teamDefaultProfile);
    }
    formData.append('otherField', teamName);
  };

  const setToTeamDefaultProfile = () => {
    setSelectedFile(null);
  };

  return (
    <CreateTeamModalContainer>
      <CloseButtonBox>
        <img src={close} onClick={onClose} alt="close" style={{ width: '17px', height: '17px', cursor: 'pointer' }} />
      </CloseButtonBox>
      <ModalHead>
        <p>팀 만들기</p>
      </ModalHead>
      {selectedFile === null && (
        <ProfileImageBox>
          <img src={teamDefaultProfile} style={{ width: '100px', height: '100px' }} />
        </ProfileImageBox>
      )}
      {selectedFile && (
        <ProfileImageBox>
          <img src={teamProfileEx} style={{ width: '100px', height: '100px', borderRadius: '50px' }} />
        </ProfileImageBox>
      )}

      <form onSubmit={handleSubmit}>
        <FileUploadButtonBox>
          <FileUploadButton>
            <label htmlFor="fileInput" style={{ fontWeight: 'bold' }}>
              프로필 사진 업로드
            </label>
          </FileUploadButton>
          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
        </FileUploadButtonBox>

        <ChangeToDefaultImageTextBox>
          <div onClick={setToTeamDefaultProfile}>기본 이미지로 변경</div>
        </ChangeToDefaultImageTextBox>

        <TeamNameInputBox>
          <TeamNameInput>팀 이름을 입력해주세요.*</TeamNameInput>
          <Input type="text" value={teamName} onChange={handleOtherFieldChange} />
        </TeamNameInputBox>

        <SubmitButton type="submit">팀 만들기</SubmitButton>
      </form>
    </CreateTeamModalContainer>
  );
};

export default CreateTeamModal;
