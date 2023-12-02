import { StyledDescricao } from "./styles.jsx";
import { BotaoDownload } from "../Download/index.jsx";
import { AppConfig } from "../../configuracao/config";

export function Descricao() {
  // Recuperar textos e títulos da tela de descrição do arquivo de configuração
  const { titulo, subtitulo, instrucoes } = AppConfig.telaDescricao;
  const { passos } = instrucoes;

  const {Container, Holder, Titulo, Subtitulo, Secao, Texto } = StyledDescricao;
  
  return (
    <Container>
      <Holder>
        <Titulo>{titulo}</Titulo>
        <Subtitulo style={{color: '#8d8d8deb'}}>{subtitulo}</Subtitulo>
      </Holder>
      {/* Evitar poluição na definição do componente, retirando a configuração de textos de um arquivo config.js */}
      {passos.map((passo, idx) => (
        <Secao key={idx}>
          <Subtitulo>{passo.titulo}</Subtitulo>
          <Texto>{passo.descricao}</Texto>
          {/* Renderizar botão conforme passo correspondente ao download */}
          {
          passo.id == 2 && 
            <BotaoDownload />
          }
        </Secao>
      ))}
    </Container>
  );
}
