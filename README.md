🏠 Controle de Gastos Residenciais

Sistema web para controle de gastos residenciais com separação clara entre API e Front-end. O projeto permite gerenciar pessoas, categorias e transações financeiras com validações de regras de negócio.

Durante o desenvolvimento foi utilizado Visual Studio Community 2022 para o backend e Visual Studio Code para o frontend.


🏗️ Estrutura do Projeto


    ├─ backend/   → Web API em ASP.NET Core (.NET 8)

    └─ frontend/  → Aplicação SPA em React 19 + TypeScript (Vite)


🛠️ Stack Tecnológica

    Back-end: .NET 8, Entity Framework Core, SQLite, Swagger (Swashbuckle).

    Front-end: React 19, TypeScript, Vite, Axios, React Router Dom.

    Banco de Dados: SQLite (leve e sem necessidade de instalação de servidor externo).


⚙️ Pré-requisitos

    .NET SDK 8.0

    Node.js 18+

    Ferramenta de linha de comando do Entity Framework:
    Bash

    dotnet tool install --global dotnet-ef


🗄️ BACKEND: Configuração do Banco de Dados (SQLite)

O projeto utiliza SQLite para facilitar a avaliação.

  Navegue até a pasta do backend, abra um terminal ou abra o projeto GastosResidenciaisAPI.sln:
  
  Se estiver utilizando o Visual Studio Community (2022), vá para aba Tools -> NuGet Packager Manager -> Packager Manager Console
  
  Bash

    cd GastosResidenciaisAPI

  Execute as migrations para criar o arquivo .db:
  
  Bash

    dotnet ef database update


▶️ Como Executar
1. Back-end (API)

  Na pasta GastosResidenciaisAPI:
  
  Bash

    dotnet run

  A API estará disponível em: https://localhost:7050

  Acesse o Swagger para testes de endpoints: https://localhost:7050/swagger

  Dica: Você também pode executar o projeto diretamente pelo Visual Studio Community, selecionando o perfil de inicialização "https" e clicando no botão Run (Play).

  ⚠️ Observação: Caso ocorra falha ao acessar o Swagger, verifique se a porta 7050 já está sendo utilizada por outra aplicação. Se necessário, feche a aplicação conflitante ou altere a porta no arquivo Properties/launchSettings.json.


2. Front-end (Web)

  Em um novo terminal, na pasta frontend, execute um comando por vez:
  
  Bash

    npm install
    npm run dev

A aplicação iniciará via Vite em: http://localhost:5173


🧠 Detalhes de Implementação

    Comunicação: O front-end utiliza Axios para chamadas à API. A configuração de baseURL encontra-se em frontend/src/api/api.ts.

    Rotas: Gerenciamento de navegação Single Page Application (SPA) com React Router.
