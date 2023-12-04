import styled from 'styled-components';
import { flexColumnStyles, smallScreen } from '../../componentes/GlobalStyles';

export const Container = styled.div`
${flexColumnStyles}
  margin: 0 auto;
  width: 80%;
  
  @media (max-width: ${smallScreen}) {
    width: 90%;
    margin: 0px auto 25px auto;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  gap: 25px;
  border-radius: 5px;

  @media (max-width: ${smallScreen}) {
    flex-direction: column;
  }
`;