import styled from "styled-components";
import { mobileScreen } from "../../componentes/GlobalStyles";

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    gap: 150px;

    @media (max-width: ${mobileScreen}) {
        flex-direction: column;
        gap: 10px;
    
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
    margin: 0 auto;

    @media (max-width: ${mobileScreen}) {
        width: 80%;
        margin-bottom: 25px;
    }
`;

export const Main = {
    Container,
    Wrapper
}