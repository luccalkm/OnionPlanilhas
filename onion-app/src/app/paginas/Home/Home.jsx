import { Descricao } from "../../componentes/Descricao/index.jsx";
import { NavBar } from "../../componentes/NavBar/index.jsx";
import { GlobalStyles } from "../../componentes/GlobalStyles.jsx";
import { Main } from "./styles.jsx";
import { useState } from "react";
import { Upload } from "../../componentes/Upload/index.jsx";

export const Home = () => {
  const [isFileDragged, setIsFileDragged] = useState(false);

  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsFileDragged(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isFileDragged) {
      setIsFileDragged(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (e.relatedTarget === null || !e.currentTarget.contains(e.relatedTarget)) {
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
      <NavBar />
      <Main.Container>
        <Descricao />
        <Upload isFileDragged={isFileDragged}/>
      </Main.Container>
    </Main.Wrapper>
  );
};

export default Home;
