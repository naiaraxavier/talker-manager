# Talker Manager 🎙️✨
**Talker Manager** é uma aplicação dedicada ao cadastro de palestrantes (talkers), oferecendo funcionalidades abrangentes de CRUD (Create, Read, Update e Delete). Desenvolvida para proporcionar uma experiência completa, a aplicação permite aos usuários realizar diversas operações, incluindo o cadastro, visualização, pesquisa, edição e exclusão de informações sobre palestrantes.

## Objetivo 🚀
O objetivo principal é oferecer uma solução eficiente e intuitiva para o gerenciamento de palestrantes. O projeto foi desenvolvido com foco nas seguintes habilidades e tecnologias:

## Habilidades Trabalhadas 💡
- Utilização do Docker para facilitar o ambiente de desenvolvimento.
- Aplicação de conceitos de CRUD para interação com um banco de dados e utilizando arquivo json.


## Como Usar 🛠️
**Pré-requisitos**
- Certifique-se de ter o Node.js e o Docker instalados na sua máquina.

## Passos para Executar a Aplicação :rocket:
**Usando Docker:**

Certifique-se de ter o Docker instalado. Execute o seguinte comando para subir a aplicação:

```bash
# em um terminal, inicie os containers
docker-compose up -d

# acesse o terminal do container inicie a aplicação
docker exec -it talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev
```

**Executando Localmente:**

Crie um arquivo .env na raiz do projeto seguindo o padrão do arquivo env.example e modifique conforme necessário.

Execute os seguintes comandos:

```bash
npm install
env $(cat .env) npm start
```

## Acesso à Aplicação :globe_with_meridians:
Abra o navegador e acesse http://127.0.0.1:3001/ para visualizar a aplicação Talker Manager.

## Contribuições 💪
### Desenvolvido por Mim
#### Arquivos e Pastas
-`src/db/connection.js`

-`src/db/talkersDB.js`

-`src/middlewares/authentication.js`

-`src/middlewares/checkLogin.js`

-`src/middlewares/checkTalker.js`

-`src/routes/loginRoutes.js`

-`src/routes/talkerRoutes.js`

-`tests/utils/helperFunctions.js`

### Desenvolvido pela Trybe
A maior parte dos arquivos e pastas não mencionados como desenvolvidos por mim está relacionada ao desenvolvimento pela Trybe.
