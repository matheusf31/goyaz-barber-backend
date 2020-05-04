# Descrição

App da barbearia GoyazBarber, localizada em Anápolis-GO. O app foi feito com NodeJS no backend e React-Native na parte mobile. O app mobile está dividido em dois, onde um é para os clientes e o outro para o provedor de serviços;

# Ferramentas

As ferramentas utilizadas serão colocadas em cada parte do app (backend, cliente e provedor). No momento apenas as ferramentas do backend estão listadas.

# Como executar o projeto

## Backend

#### Para executar o backend do projeto siga os seguintes passos:

- verifique se o [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable) está instalado na sua máquina;
- verifique se o [NodeJS](https://nodejs.org/en/download/) está instalado na sua máquina;
- instale em sua máquina o [Docker CE](https://docs.docker.com/engine/install/);
  - Obs.: Para Windows e Mac o app desktop basta, no Ubuntu e outras distros linux é necessário fazer a [instalação pelo terminal](https://docs.docker.com/engine/install/ubuntu/);

#### Agora baixe o projeto:

- clone ou faça download do repositório em uma pasta no seu pc;
- entre na pasta backend, abra um terminal e rode `$ yarn`;

#### Configure os bancos de dados:

- certifique que o docker está rodando executando `$ docker ps` ou `$ sudo docker ps`;
- depois rode os seguintes comandos para criar os containeres (o nome pode ser qualquer um, o password também):
  - `$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11`
  - `$ docker run --name mongobase -p 27017:27017 -d -t mongo`
  - `$ docker run --name redisbase -p 6379:6379 -d -t redis:alpine`
- ainda dentro do projeto, no terminal, rode `$ yarn sequelize db:migrate`

#### Agora configure o arquivo .env:

- dentro do projeto existe um arquivo chamado .env.example, crie um arquivo .env no mesmo lugar e copie e cole tudo que tem em .env.example no novo arquivo;
- feito isso, preecha as variáveis faltando, por exemplo, para os comandos rodados a cima, o arquivo .env ficou da seguinte forma: [.env]
- agora, certifique que os containeres estão rodando `$ docker ps` e rode no terminal `$ yarn dev`


