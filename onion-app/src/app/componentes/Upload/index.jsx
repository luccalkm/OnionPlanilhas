import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import uploadLoadingData from "../../../assets/upload_2.json";
import { FileInput, StyledUpload } from "./styles.jsx";

export function Upload() {
  const [isLottieVisible, setLottieVisible] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileSelected, setFileSelected] = useState(false); // Novo estado para rastrear se um arquivo foi selecionado
  const { Container, Button, Text } = StyledUpload;
  const fileRef = useRef();

  const handleButtonClick = () => {
    fileRef.current.click();
    setLottieVisible(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setLottieVisible(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setLottieVisible(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setLottieVisible(false);
    e.stopPropagation();

    // Obtém os arquivos do evento de soltar
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileRef.current.files = files; // Atualiza o input de arquivo com os arquivos soltos
      handleFileChange({ target: { files } }); // Chama handleFileChange com os arquivos
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploadMessage("Arquivo carregado com sucesso!");
      setFileSelected(true);
      // Esconder Lottie após o upload
      setLottieVisible(false);
    } else {
      // Caso o usuário cancelou a seleção de arquivo
      setLottieVisible(false);
      setFileSelected(false);
    }
  };

  useEffect(() => {
    // Limpar o input de arquivo após a seleção ou cancelamento
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }, []);

  return (
    <Container
      onDragEnter={handleDragEnter}
      onDragCapture={handleDrop}
      onDragLeaveCapture={handleDragLeave}
    >
      <FileInput required type="file" ref={fileRef} onChange={handleFileChange} />
      {isLottieVisible ? (
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
