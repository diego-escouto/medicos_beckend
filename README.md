# Game-API - Pack de Aprendizado

Pacote de programação para disciplinas de desenvolvimento web back-end, utilizando Javascript com Nodejs + [Express](https://expressjs.com/). O Objetivo é servir de exemplo para a elaboração de uma API para comunicar dados em JSON a respeito de uma modelagem. É uma API RESTful com validações de schemas JSON ([Ajv](https://ajv.js.org/)) e para autenticação utiliza JWT Token ([jsownwebtoken](https://github.com/auth0/node-jsonwebtoken)). Na persistência de dados, se utiliza o ORM [Sequelize](https://sequelize.org/) com banco de dados em MySQL.

Este projeto faz parte de uma série de aprendizado em APIs. Nesta mesma série, você pode acessar o mesmo projeto implementado com [PHP e Lumen](https://github.com/fabiosperotto/pratica-api-rest).

## Compatibilidade

- Nodejs 18.16.x;
- npm 9.5.x;
- Express 4.18.2
# medicos_beckend — API de Médicos, Clínicas e Clientes

API RESTful em Node.js para gerenciamento de médicos, clínicas e clientes. Projeto construído com:

- Node.js + Express
- Sequelize (MySQL)
- Validação de payloads com Ajv
- Autenticação via JWT (Bearer Token)

**Objetivo:** servir como projeto de referência para criação de APIs REST simples com autenticação, validação e persistência.

**Documentação interativa:** a API usa `swagger-jsdoc` + `swagger-ui-express`. Após iniciar a aplicação, a documentação fica disponível em `http://localhost:<PORT>/api-docs`.

## Requisitos

- Node.js (>= 16)
- npm
- MySQL (ou outro dialeto suportado pelo Sequelize conforme `DBDIALECT`)

## Variáveis de ambiente
Crie um arquivo `.env` (pode copiar de `.env.example` se existir) e defina ao mínimo estas variáveis:

- `PORT` — porta onde o servidor roda (ex: `3000`)
- `DBHOST` — host do banco de dados
- `DBNAME` — nome do banco
- `DBUSER` — usuário do banco
- `DBPASS` — senha do banco
- `DBDIALECT` — dialeto do Sequelize (`mysql` por padrão)
- `SECRET` — segredo usado para assinar tokens JWT

## Estrutura do projeto

- `app/`
  - `commons/` — helpers
  - `controllers/` — controladores da API
  - `middlewares/` — middlewares (ex.: `TokenValido.js`)
  - `models/` — classes e definições Sequelize
  - `routes/` — definição de rotas
  - `schemas/` — JSON Schemas usados pelo Ajv
- `config.js` — configurações (porta, credenciais, jwt)
- `app.js` — ponto de entrada

## Instalação

No PowerShell (Windows) — no diretório do projeto:

```powershell
cp .env.example .env # ou copie manualmente .env.example para .env
npm install
```

## Executando em desenvolvimento

```powershell
npx nodemon
# ou
node app.js
```

O servidor usará a porta definida em `PORT` (ou 3000 por padrão). A rota raiz (`/`) responde com um JSON simples.

## Documentação (Swagger)

Após iniciar a aplicação, abra: `http://localhost:<PORT>/api-docs`.

Observação: para que os endpoints apareçam no Swagger, mantenha comentários JSDoc/Swagger nas rotas em `app/routes/`.

## Banco de dados

A conexão é inicializada em `app/models/conexao.js` e as models são sincronizadas via `app/models/index.js`. Verifique `config.js` para configurar os parâmetros do Sequelize.

## Autenticação

As rotas protegidas usam JWT via cabeçalho `Authorization: Bearer <token>`. O middleware `app/middlewares/TokenValido.js` valida o token.

## Testes e validação

Este repositório não inclui uma suíte de testes automatizados. Para verificar manualmente, crie clientes via rota de cadastro e autentique para obter tokens, então consuma rotas protegidas.

## Contribuições

Contribuições bem-vindas: abertura de issues, correções de bugs e melhorias na documentação. Para mudanças maiores, abra uma issue descrevendo a proposta antes de submeter PR.

---

Se quiser, eu posso:

- adicionar comentários Swagger (JSDoc) em algumas rotas (`app/routes/medico.routes.js` e `cliente.routes.js`),
- ou gerar um pequeno exemplo de `.env.example` com as variáveis necessárias.
