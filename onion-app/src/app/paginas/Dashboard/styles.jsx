import styled from 'styled-components';
import { flexColumnStyles, mobileScreen, darkerPrimaryColor, primaryColor } from '../../componentes/GlobalStyles';

export const Container = styled.div`
${flexColumnStyles}
  margin: 0 auto;
  width: 80%;
  
  @media (max-width: ${mobileScreen}) {
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

  @media (max-width: ${mobileScreen}) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  padding: 18px 15px;
  background-color: ${primaryColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bolder;
  margin: 30px 0% 20px 80%;

  &:hover {
    background-color: ${darkerPrimaryColor};
  }

  @media (max-width: ${mobileScreen}) {
    width: 100%;
    text-align: center;
    margin: 40px 0px 20px 0px;
  }
`;
