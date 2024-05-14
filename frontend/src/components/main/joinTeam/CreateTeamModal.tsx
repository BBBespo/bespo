import React, { useState } from 'react';
import styled from 'styled-components';
import close from '../../../assets/images/schedule/close.png';
import teamDefaultProfile from '../../../assets/images/createTeam/teamDefaultProfile.png';
import teamProfileEx from '../../../assets/images/createTeam/teamProfileEx.png';
import copy from '../../../assets/images/createTeam/copy.png';
import kakao from '../../../assets/images/createTeam/kakao.png';
import link from '../../../assets/images/createTeam/link.png';

const CreateTeamModalContainer = styled.div`
  width: 30%;
  height: 58vh;
  padding: 4vh;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
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
  margin-bottom: 15px;
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

const TeamCodeInputBox = styled.div`
  margin-top: 30px;
  position: relative;
`;

const TeamNameInputText = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
`;

const TeamNameInput = styled.input`
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

const TeamCodeInput = styled.input`
  width: 100%;
  padding: 20px;
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

const ContentTextBox = styled.div`
  text-align: center;
  font-size: 14px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
`;

const CreateTeamModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [teamName, setTeamName] = useState('');
  const [isTeamCreated, setIsTeamCreated] = useState(false);
  const [teamCode, setTeamCode] = useState('');

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

    /* 팀 생성 api 호출 후 */
    setIsTeamCreated(true);
    setTeamCode('3yKlt3');
  };

  const setToTeamDefaultProfile = () => {
    setSelectedFile(null);
  };

  const copyTeamCode = () => {
    navigator.clipboard.writeText(teamCode);
  };

  return (
    <>
      <CreateTeamModalContainer>
        <CloseButtonBox>
          <img src={close} onClick={onClose} alt="close" style={{ width: '17px', height: '17px', cursor: 'pointer' }} />
        </CloseButtonBox>

        {isTeamCreated && (
          <>
            <ModalHead>
              <p>팀 초대 코드</p>
            </ModalHead>
            <ProfileImageBox>
              <img
                src="https://bespo.s3.ap-northeast-2.amazonaws.com/teamImage/bm.png"
                style={{ width: '100px', height: '100px', borderRadius: '50px' }}
              />
            </ProfileImageBox>
            <ContentTextBox>
              <div>팀 만들기가 완료되었습니다.</div>
              <div>팀원을 초대 코드로 초대해보세요.</div>
            </ContentTextBox>

            <TeamCodeInputBox>
              <TeamCodeInput type="text" value={teamCode} readOnly />
              <img
                src={copy}
                onClick={copyTeamCode}
                alt="copy"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  width: '30px',
                }}
              />
            </TeamCodeInputBox>

            <IconBox>
              <img src={kakao} alt="kakao" style={{ width: '50px', height: '50px', marginRight: '15px' }} />
              <img src={link} alt="link" style={{ width: '50px', height: '50px' }} />
            </IconBox>
          </>
        )}

        {!isTeamCreated && (
          <>
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
                <TeamNameInputText>팀 이름을 입력해주세요.*</TeamNameInputText>
                <TeamNameInput type="text" value={teamName} onChange={handleOtherFieldChange} />
              </TeamNameInputBox>

              <SubmitButton type="submit">팀 만들기</SubmitButton>
            </form>
          </>
        )}
      </CreateTeamModalContainer>
    </>
  );
};

export default CreateTeamModal;
