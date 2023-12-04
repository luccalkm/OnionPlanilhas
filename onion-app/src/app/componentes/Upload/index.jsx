import { useEffect, useState, useRef } from "react";
import { StyledLottie } from "../common/Lottie.jsx";
import uploadLoadingData from "../../../assets/upload_2.json";
import successData from "../../../assets/success.json";
import { FileInput, StyledUpload } from "./styles.jsx";
import { useNavigate } from "react-router-dom";
import useLoadingOnClick from "../../hooks/useLoadingOnClick.js";
import { agent } from "../../api/agent.js";

export function Upload({ draggedFile, isFileDragged }) {
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef();
  const { isLoading, enableLoading, disableLoading } = useLoadingOnClick();

  const uploadFileToAPI = async (file) => {
    try {
      const response = await agent.Planilhas.importarPlanilha(file);
      return response;
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  };

  const initiateUpload = async (file) => {
    const response = await uploadFileToAPI(file);
    if (response && response.successo) {
      setUploaded(true);
      setTimeout(() => {
        navigate("/dashboard");
        setUploaded(false);
      }, 1470);
    }
  };

  useEffect(() => {
    if (draggedFile) {
      initiateUpload(draggedFile);
    }
  }, [draggedFile]);

  useEffect(() => {
    if (isFileDragged && !isLoading) {
      enableLoading();
    } else if (!isFileDragged && isLoading) {
      disableLoading();
    }
  }, [isFileDragged, enableLoading, disableLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      initiateUpload(file);
    }
  };

  const handleButtonClick = () => fileRef.current.click();

  return (
    <StyledUpload.Container>
      <FileInput type="file" ref={fileRef} onChange={handleFileChange} />
      {isLoading ? (
        <StyledLottie animationData={uploadLoadingData} />
      ) : uploaded ? (
        <StyledLottie
          loop={false}
          style={{ width: "70%" }}
          animationData={successData}
        />
      ) : (
        <StyledUpload.Area>
          <StyledUpload.Button onClick={handleButtonClick}>
            Upload
          </StyledUpload.Button>
          <StyledUpload.Text>
            ou arraste e solte sua planilha!
          </StyledUpload.Text>
        </StyledUpload.Area>
      )}
    </StyledUpload.Container>
  );
}
