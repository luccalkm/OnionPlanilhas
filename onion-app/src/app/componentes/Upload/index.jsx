import { useState, useRef } from "react";
import {StyledLottie} from "../common/Lottie.jsx";
import uploadLoadingData from "../../../assets/upload_2.json";
import { FileInput, StyledUpload } from "./styles.jsx";
import { useLoadingOnClick } from "../../../features/hooks/useLoadingOnClick.jsx";

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

  if (isFileDragged && !isLoading) {
    enableLoading();
  } else if (!isFileDragged && isLoading) {
    disableLoading();
  }

  return (
    <Container>
      <FileInput type="file" ref={fileRef} onChange={handleFileChange} />
      {isLoading ? (
        <StyledLottie
          animationData={uploadLoadingData}
        />
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
