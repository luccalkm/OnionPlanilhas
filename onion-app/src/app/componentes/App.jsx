import '../../index.css'
import { Descricao } from './Descricao/index.jsx'
import { NavBar } from './NavBar/index.jsx'
import { GlobalStyles } from './GlobalStyles.jsx'

const App = () => {

  return (<div style={{width: '70%', margin: '0 auto'}}>
    <GlobalStyles />
    <NavBar />
    <Descricao />
  </div>)
}

export default App
