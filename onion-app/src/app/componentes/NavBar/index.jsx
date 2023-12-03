
import logo_onion from '../../../assets/onion_planilha_logo.png';
import { StyledNavBar } from './styles';

export function NavBar({title}) {

  const {Container, Logo, LogoImg} = StyledNavBar

  return (
    <Container>
      <Logo href="/">{title}</Logo>
      <LogoImg src={logo_onion} />
    </Container>
  );
};
