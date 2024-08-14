# Iguincho

# Pré requisitos:

- npm

### Para rodar no seu computador:

Basta clonar o repositório e seguir as instruções para cada uma das pastas:

## Front-end:

Rodar o comando `npm install` para baixar as dependências e então rodar o projeto com `npm run dev`. Feito isso, o projeto estará acessível na porta 3000.

## Back-end:

Rodar o comando `npm install` para baixar as dependências e então executar `npx prisma migrate dev` para gerar as tabelas do banco de dados (já deve estar rodando o banco de dados). Feito isso, basta iniciar o projeto com `npm run start-dev`.

### Varáveis de ambiente necessárias:

Basta criar um arquivo .env em `backend/.env` com a seguinte variável de ambiente:

| Key            | Value                                     |
| -------------- | ----------------------------------------- |
| DATABASE_URL   | URL apontando para o banco de dados       |

Há um exemplo de como o arquvo deve ficar em `backend/dotnev_example`.
