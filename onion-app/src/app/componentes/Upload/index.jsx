import { useState, useRef } from "react";
import Lottie from "lottie-react";
import uploadLoadingData from "../../../assets/upload_2.json";
import { FileInput, StyledUpload } from "./styles.jsx";
import { useLoadingOnClick } from "../../../features/useLoadingOnClick.jsx";

export function Upload({ uploadFileToAPI, isFileDragged }) {
  const { isLoading, enableLoading, disableLoading } = useLoadingOnClick();
  const { Container, Button, Text } = StyledUpload;
  const [uploadMessage, setUploadMessage] = useState("");
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFileToAPI(file);
      setUploadMessage("Arquivo carregado com sucesso!");
    }
  };

  const handleButtonClick = () => {
    fileRef.current.click();
  };

  // Integrar com a lógica de arrastar e soltar
  if (isFileDragged && !isLoading) {
    enableLoading();
  } else if (!isFileDragged && isLoading) {
    disableLoading();
  }

  return (
    <Container>
      <FileInput type="file" ref={fileRef} onChange={handleFileChange} />
      {isLoading ? (
        <Lottie animationData={uploadLoadingData} style={{ width: 400, height: 400 }} />
      ) : (
        <>
          {uploadMessage || (
            <>
              <Button onClick={handleButtonClick}>Upload</Button>
              <Text>ou arraste e solte sua planilha!</Text>
            </>
          )}
        </>
      )}
    </Container>
  );
}
