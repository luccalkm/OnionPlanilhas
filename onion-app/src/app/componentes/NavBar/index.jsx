
import logo_onion from '../../../assets/onion_planilha_logo.png';
import { StyledNavBar } from './styles';

export function NavBar() {

  const {Container, Logo, LogoImg} = StyledNavBar

  return (
    <Container>
      <Logo href="/">Onion S.A.
      </Logo>
      <LogoImg src={logo_onion} />
    </Container>
  );
};
