import { Home } from "./paginas/Home/Home.jsx";
import { Dashboard } from "./paginas/Dashboard/Dashboard.jsx";
import GlobalStyles from "./componentes/GlobalStyles.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default App;
