E-commerce (Style)
Projeto Final TT - 26.2
Projeto full stack de e-commerce com utilização do React no front-end e <br>
API REST no back-end (Node.js + Express + Prisma + PostgreSQL).


✨ Principais features (visão geral)
Back-end (API)
API REST para operações do e-commerce (ex.: autenticação e recursos de produtos)
Autenticação de usuários (com suporte a chaves/segredos)
Upload de arquivos/imagens
Validação de dados em rotas
Banco de dados com ORM e geração de client
Seeders para popular o banco com dados de teste
Estrutura organizada por rotas, controllers e middlewares

Front-end (Web)
Interface em React com páginas principais do e-commerce
Telas de autenticação (login e cadastro)
Listagem/visualização de produtos
Integração com a API do back-end via requisições HTTP
Componentização e estilização seguindo layout do projeto (Figma)
<br>
<br>

✅ Pré-requisitos
Node.js
PostgreSQL
npm

---

▶️ Como rodar o Back-end
1) Entrar na pasta do back-end
cd backend
2) Instalar Dependencias
npm install
3) Criar o arquivo .env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/NOME_DO_BANCO?schema=public"<br>
4) Gerar as keys da autenticação
npx ts-node src/config/generateKeyPairs.ts <br>
quando gerado vai aparecer (Keys generated successfully!) <br>
5) Gerar Prisma Client
npx prisma generate
6) (Opcional) Popular o banco com seed (Faker)
npm run seed
7) Iniciar a API
npm run dev

▶️ Como rodar o Front-end
1) Entrar na pasta do front-end
cd front
2) Instalar Dependencias
npm install
7) Iniciar
npm run dev
