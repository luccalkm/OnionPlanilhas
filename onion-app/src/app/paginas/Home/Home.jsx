import { Descricao } from "../../componentes/Descricao/index.jsx";
import { NavBar } from "../../componentes/NavBar/index.jsx";
import { GlobalStyles } from "../../componentes/GlobalStyles.jsx";
import { Main } from "./styles.jsx";
import { useState } from "react";
import { Upload } from "../../componentes/Upload/index.jsx";
import { AppConfig } from "../../configuracao/config.js";
import { agent } from "../../api/agent.js";

export const Home = () => {
  const [isFileDragged, setIsFileDragged] = useState(false);
  const { tituloHome } = AppConfig;

  const uploadFileToAPI = async (file) => {
    setIsFileDragged(true);
    try {
      const response = await agent.Planilhas.importarPlanilha(file);
      console.log(response);
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
    setIsFileDragged(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      uploadFileToAPI(file);
    } else {
      setIsFileDragged(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isFileDragged) {
      setIsFileDragged(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (
      e.relatedTarget === null ||
      !e.currentTarget.contains(e.relatedTarget)
    ) {
      setIsFileDragged(false);
    }
  };

  return (
    <Main.Wrapper
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <GlobalStyles />
      <NavBar titulo={tituloHome} />
      <Main.Container>
        <Descricao />
        <Upload isFileDragged={isFileDragged} uploadFileToAPI={uploadFileToAPI} />
      </Main.Container>
    </Main.Wrapper>
  );
};

export default Home;
