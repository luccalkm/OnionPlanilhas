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
---
2. EPPlus
---
3. EntityFramework
---
4. SQLite (para desenvolvimento e portabilidade)

### Front-End

#### Bibliotecas Utilizadas (6)

1. **Styled Components**
- CSS-in-JS para agilidade e estilização dinâmica de componentes.
---
2. **Chart.js & React-Chartjs-2**
- Utilizados para criar gráficos interativos e responsivos.
---
3. **Lottie**
- Usados para renderizar animações mais leves e com alta qualidade exportadas do Adobe After Effect.
---
4. **React Router Dom**
- Permite uma navegação fluida e dinâmica entre as diferentes telas.
---
5. **React Toastify**
- Biblioteca para criar alertas (positivas ou negativas) responsivas e configuráveis.
---
6. **Axios**
- Cliente HTTP baseado em promessas para fazer requisições HTTP.

## Começando

### Pré-requisitos
- [Node](https://nodejs.org/en/download/current)
- [.NET 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [Visual Studio / VSCode (opcional)](https://code.visualstudio.com/)

### Instalação
Iniciando o processo de instalação da aplicação, temos que efetuar 3 passos:

**1. Clonar o repositório**
```bash
# Exemplo de comando para clonar o repositório
git clone https://github.com/luccalkm/OnionPlanilhas.git
cd onion-sa
```

**2. Restaurar as configurações do Back-End**
```bash
dotnet restore
cd API
```
Caso queira visualizar a documentação da API, é possível através do Swagger.

**3. Restaurar as configurações do Front-End**
```bash
# Se estiver na raiz
cd onion-app 
# Se estiver no diretório .\API
cd ../onion-app
npm install
```

### Executando o Projeto
Após clonar o repositório, basta executar os seguintes comandos:

#### Backend
No diretório raiz podemos, em dois terminais:
```bash
dotnet watch --project .\API\
```
#### Front-End
```bash
npm run dev
```