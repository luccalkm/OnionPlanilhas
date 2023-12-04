import { Home } from "./paginas/Home/Home.jsx";
import { Dashboard } from "./paginas/Dashboard/Dashboard.jsx";
import GlobalStyles from "./componentes/GlobalStyles.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
