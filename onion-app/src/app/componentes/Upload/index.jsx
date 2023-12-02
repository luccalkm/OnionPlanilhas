import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import uploadLoadingData from "../../../assets/upload_2.json";
import { FileInput, StyledUpload } from "./styles.jsx";

export function Upload({ isFileDragged }) {
  const { Container, Button, Text } = StyledUpload;
  const [uploadMessage, setUploadMessage] = useState('');
  const fileRef = useRef();

  const handleButtonClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploadMessage("Arquivo carregado com sucesso!");
    } else {
      setUploadMessage("Nenhum arquivo encontrado...");
    }
  };

  return (
    <Container
    >
      <FileInput required type="file" about="_blank" ref={fileRef} onChange={handleFileChange} />
      {isFileDragged ? (
        <Lottie
          animationData={uploadLoadingData}
          style={{ width: 400, height: 400, opacity: 1, transition: "opacity 300ms" }}
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
