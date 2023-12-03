import styled from 'styled-components';
import { flexColumnStyles } from '../../componentes/GlobalStyles';

export const Container = styled.div`
${flexColumnStyles}
  margin: 0 auto;
  width: 80%;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  gap: 25px;
  border-radius: 5px;
`;