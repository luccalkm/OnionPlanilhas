import styled from "styled-components";
import { flexColumnStyles, primaryColor, mobileScreen, baseFontSize, basePadding } from "../GlobalStyles";

const Container = styled.article`
    ${flexColumnStyles};
    width: 70%;
    margin: 0 auto;

    @media (max-width: ${mobileScreen}) {
        width: 100%;
    
    }
`;

const Holder = styled.div`
    ${Container};
`;

const Title = styled.h1`
    color: ${primaryColor};
`;

const SubTitle = styled.h3`
    color: ${primaryColor};
`;

const Secao = styled.section`
    ${flexColumnStyles};
    padding: calc(${basePadding} * 0.5) 0;
`;

const baseText = styled.p`
    font-size: ${baseFontSize};
    color: ${primaryColor};
    margin-bottom: 16px;
    text-wrap: wrap;
`;

const Text = styled(baseText)``;

const BoldText = styled(baseText)`
    font-size: calc(${baseFontSize} * 1.08);
    font-weight: bold;
`;

export const StyledDescription = {
    Container,
    Holder,
    Title,
    SubTitle,
    Secao,
    Text,
    BoldText
};
