
import logo_onion from '../../../assets/onion_planilha_logo.png';
import { StyledNavBar } from './styles';

export function NavBar({titulo}) {

  const {Container, Logo, LogoImg} = StyledNavBar

  return (
    <Container>
      <Logo href="/">{titulo}</Logo>
      <LogoImg src={logo_onion} />
    </Container>
  );
};
