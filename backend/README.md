# Descrição

Backend do app GoyazBarber, feito utilizando NodeJS, juntamente com o framework Express para o roteamento da aplicação. Além disso, utilizei o Docker para criar containeres e hospedar o banco de dados da aplicação;

O backend da aplicação realiza atividades simples como listagem/criação/atualização/deleção de usuários, validação de login com token JWT, processamento de datas para realizar os agendamentos (tanto pro provedor quanto para o cliente) utilizando o date-fns, listagem/criação/atualização/deleção de agendamentos, entre outras funcionalidades;

# Funcionalidades utilizadas no backend

#### Organização e padronização de código

- Prettier: padronização e organização do código;
- Eslint: padronização e organização do código.

#### Server

- Arquitetura MVC: padrão de arquitetura de software utilizado para separar responsabilidades;
- Express: para criação de rotas e serviços da aplicação;
- Nodemon: para manter o server rodando mesmo depois de fazer alterações no código;
- Sucrase: para utilizar a sintaxe import/export dentro do node.

#### Banco de dados

- Docker: utilizado para criar uma instância da data base da aplicação em um container com uma imagem do postgres;
- Postgres: banco de dados utilizado na aplicação;
- MongoDB: banco não relacional utilizado para dados que não são estruturados e são performáticos;
- Sequelize: ORM para fazer as querys na data base postgres;
- Mogoose: ORM para o mongoDB;
- Postbird: visualizar os dados que estão no banco de dados postgres;
- MongoDB Compass: visualizar os dados que estão no banco de dados mongo;
- Redis: banco de dados não relacional que salva apenas chave e valor, utilizado para tarefas em segundo plano.

#### Validações

- Bcryptjs: utilizado para criar um hash do password do usuário;
- JWT: forma de fazer autenticação em API REST; - jsonwebtoken: gera o token JWT.
- Yup: biblioteca de validação de dados de entrada.

#### Data e arquivos

- Multer: para uploads de arquivos (diferente do formato JSON);
- Date-fns: para lidar com datas dentro do node.

#### Email (provavelmente será removido)

- Nodemailer: utilizado para envio de emails;
- Mailtrap: uma caixa de entrada online e gratuita para testar o envio de email em ambiente de desenvolvimento;
- TemplateEngine: arquivos html que podem receber variáveis do node (alem de outras); - Handlebars: templateengine utilizado.

#### Outros

- Sentry: ferramenta de monitaramento de erros;
- Youch: tratar as mensagens de erro.
- Dotenv: configurar as variáveis ambiente da aplicação.

# Como rodar
