import { Home } from "./paginas/Home/Home.jsx";
import { Dashboard } from "./paginas/Dashboard/Dashboard.jsx";
import GlobalStyles from "./componentes/GlobalStyles.jsx";

const App = () => {
  return (
    <>
      <GlobalStyles />
      {/* <Home /> */}
      <Dashboard />
    </>
  );
};

export default App;
