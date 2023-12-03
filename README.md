# Onion S.A. - Sistema de Controle e Logística

## Sobre a Onion S.A.

Bem-vindo à Onion S.A.! Somos uma empresa líder na indústria de eletrônicos, comprometida com a inovação e a tecnologia de ponta. Nossos produtos incluem celulares, smart TVs e notebooks. Atualmente, enfrentamos desafios significativos em controle, manutenção de vendas e logística. Para enfrentar esses desafios, estamos desenvolvendo um MVP revolucionário destinado a otimizar esses processos.

## Objetivo do Projeto

Este projeto visa desenvolver um sistema para melhorar o controle de vendas, manutenção e logística da Onion S.A. Através de uma interface intuitiva e recursos avançados, buscamos facilitar a gestão e melhorar a eficiência operacional.

## Tecnologias Utilizadas

### Back-End

#### Estrutura
- **API**
  - Controladores
  - Classe principal (`Program`)
  - Classes de processamento para suporte aos controladores
- **Aplicação**
  - Lógica de negócios
  - Instância de banco de dados
  - Mapeamentos
- **Domínio**
  - Camada dedicada à regra de negócio, sem dependências externas

#### Pacotes
1. AutoMapper
2. EPPlus
3. EntityFramework
4. SQLite (para desenvolvimento e portabilidade)

### Front-End

#### Bibliotecas Utilizadas
- **Styled Components**
  - CSS-in-JS para estilização dinâmica de componentes.
  - Escolhido para agilidade e qualidade em projetos de menor escala.
 
- **Gráficos**
  - ... 

## Começando

### Pré-requisitos
- Node
- .NET
- Visual Studio / VSCode

### Instalação
Iniciando o processo de instalação da aplicação, temos que efetuar 3 steps:

**1. Clonar o repositório**
```bash
# Exemplo de comando para clonar o repositório
git clone [URL do Repositório]
cd onion-sa
```

**2. Restaurar as configurações do Back-End**
```bash
dotnet restore
# Para testar, inicie o projeto
cd API
dotnet watch
```
Caso queira visualizar a documentação da API, é possível através do Swagger.

**3. Restaurar as configurações do Front-End**
```bash
cd onion-app
npm install
```

### Executando o Projeto
Após clonar o repositório, basta executar os seguintes comandos:
```bash
# Exemplo de comandos para iniciar o projeto
cd onion-sa
npm start # Para Front-End
dotnet run # Para Back-End
```

