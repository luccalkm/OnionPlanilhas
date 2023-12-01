
import logo_onion from '../../../assets/onion_planilha_logo.png';
import { StyledNavBar } from './styles';

export function NavBar() {
  return (
    <StyledNavBar.Container>
      <StyledNavBar.Logo href="/">Onion S.A.
      </StyledNavBar.Logo>
      <StyledNavBar.LogoImg src={logo_onion} />
    </StyledNavBar.Container>
  );
};
