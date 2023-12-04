import { useEffect, useState, useRef } from "react";
import { StyledLottie } from "../common/Lottie.jsx";
import uploadLoadingData from "../../../assets/upload_2.json";
import successData from "../../../assets/success.json";
import { FileInput, StyledUpload } from "./styles.jsx";
import { useNavigate } from "react-router-dom";
import useLoadingOnClick from "../../hooks/useLoadingOnClick.js";
import { agent } from "../../api/agent.js";
import { toast } from 'react-toastify';

export function Upload({ draggedFile, isFileDragged }) {
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef();
  const { isLoading, enableLoading, disableLoading } = useLoadingOnClick();

  const uploadFileToAPI = async (file) => {
    try {
      const response = await agent.Planilhas.importarPlanilha(file);
      if (response && response.sucesso) {
        setUploaded(true);
        setTimeout(() => {
          navigate("/dashboard");
          setUploaded(false);
        }, 1470);
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado ao fazer upload do arquivo. Tente novamente mais tarde.");
    } finally {
      disableLoading();
    }
  };

  useEffect(() => {
    if (draggedFile) {
      enableLoading();
      uploadFileToAPI(draggedFile);
    }
  }, [draggedFile]);

  useEffect(() => {
    if (isFileDragged && !isLoading) {
      enableLoading();
    } else if (!isFileDragged && isLoading) {
      disableLoading();
    }
  }, [isFileDragged, isLoading, enableLoading, disableLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFileToAPI(file);
    }
  };

  const handleButtonClick = () => {enableLoading(); fileRef.current.click();}

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
