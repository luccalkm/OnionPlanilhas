import styled from "styled-components";
import {primaryColor, baseFontSize, basePadding } from "../GlobalStyles";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 0 auto;
    padding: ${basePadding};
`;

const Titulo = styled.h1`
    font-size: 32px;
    color: ${primaryColor};
    padding: 0 ${basePadding};
`;

const Secao = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${basePadding};

    a {
        margin-top: 25px;
    }
`;

const baseTexto = styled.p`
    font-size: ${baseFontSize};
    color: ${primaryColor};
    margin-bottom: 16px;
    text-wrap: wrap;
`;

const Texto = styled(baseTexto)``;

const TextoNegrito = styled(baseTexto)`
    font-size: calc(${baseFontSize} * 1.08);
    font-weight: bold;
`;

export const StyledDescricao = {
    Container,
    Titulo,
    Secao,
    Texto,
    TextoNegrito
};
