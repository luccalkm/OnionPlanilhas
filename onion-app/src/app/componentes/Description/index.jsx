import { StyledDescription } from "./styles.jsx";
import { BotaoDownload } from "../Download/index.jsx";
import { AppConfig } from "../../configuracao/config";

export function Description() {
  // Recuperar textos e títulos da tela de descrição do arquivo de configuração
  const { title, subTitle, instrucoes } = AppConfig.telaDescription;
  const { steps } = instrucoes;

  const {Container, Holder, Title, SubTitle, Secao, Text } = StyledDescription;
  
  return (
    <Container>
      <Holder>
        <Title>{title}</Title>
        <SubTitle style={{color: '#8d8d8deb'}}>{subTitle}</SubTitle>
      </Holder>
      {steps.map((step, idx) => (
        <Secao key={idx}>
          <SubTitle>{step.title}</SubTitle>
          <Text>{step.Description}</Text>
          {
          step.id == 2 && 
            <BotaoDownload />
          }
        </Secao>
      ))}
    </Container>
  );
}
