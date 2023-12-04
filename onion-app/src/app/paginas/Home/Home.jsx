import { Description } from "../../componentes/Description/index.jsx";
import { NavBar } from "../../componentes/NavBar/index.jsx";
import { Main } from "./styles.jsx";
import { useState } from "react";
import { Upload } from "../../componentes/Upload/index.jsx";
import { AppConfig } from "../../configuracao/config.js";

export const Home = () => {
  const [isFileDragged, setIsFileDragged] = useState(false);
  const [file, setFile] = useState(null);
  const { titleHome } = AppConfig;

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      setFile(file);
      setIsFileDragged(false);
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
      <NavBar title={titleHome} />
      <Main.Container>
        <Description />
        <Upload
          isFileDragged={isFileDragged}
          draggedFile={file}
        />
      </Main.Container>
    </Main.Wrapper>
  );
};

export default Home;
