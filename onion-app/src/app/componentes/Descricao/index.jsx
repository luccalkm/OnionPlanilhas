import { StyledDescricao } from "./styles.jsx";
import {BotaoDownload} from "../Botao/Download/index.jsx";
import { AppConfig } from "../../configuracao/config";
import { useEffect } from "react";

export function Descricao() {
  // Recuperar textos e títulos da tela de descrição do arquivo de configuração
  const { titulo, instrucoes } = AppConfig.telaDescricao;
  const { linkDownload } = AppConfig;
  const { introducao, pergunta, comoBaixar } = instrucoes;

  useEffect(() => { console.log(linkDownload) }, [])

  return (
    <StyledDescricao.Container>
        <StyledDescricao.Titulo>{titulo}</StyledDescricao.Titulo>
        <StyledDescricao.Secao>
            <StyledDescricao.Texto>{introducao.descricao}</StyledDescricao.Texto>
            <StyledDescricao.TextoNegrito>{pergunta.descricao}</StyledDescricao.TextoNegrito>
            <StyledDescricao.Texto>{comoBaixar.descricao}</StyledDescricao.Texto>
            <BotaoDownload href={linkDownload}>
            Baixar
            </BotaoDownload>
        </StyledDescricao.Secao>
    </StyledDescricao.Container>
  );
}
