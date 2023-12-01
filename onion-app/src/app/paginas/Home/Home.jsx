import { Descricao } from "../../componentes/Descricao/index.jsx";
import { NavBar } from "../../componentes/NavBar/index.jsx";
import { GlobalStyles } from "../../componentes/GlobalStyles.jsx";
import { Main } from "./styles.jsx";
import { Upload } from "../../componentes/Upload/index.jsx";

export const Home = () => {
  return (
    <Main.Wrapper>
      <GlobalStyles />
      <NavBar />
      <Main.Container>
        <Descricao />
        <Upload />
      </Main.Container>
    </Main.Wrapper>
  );
};

export default Home;
