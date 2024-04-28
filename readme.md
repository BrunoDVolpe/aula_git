# Semana 10 - Introdução ao Sequelize

## Rodar o repositório:

### Na primeira vez é necessário instalar as dependências:
1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`

### Para rodar o repositório em ambiente local
1. `npm run start:dev`

## Trabalhando com migrations:

### Criar uma migration (na migration vou criar as tabelas e esquemas no banco de dados)
1. `sequelize migration:generate --name criar_tabela_alunos`
2. `npx sequelize-cli migration:generate --name criar_tabela_alunos` (esse comando funciona quando as dependências não estão no global)
Complemento, tirado do do blog.nodejs.org:

- If you’re installing something that you want to use in your program, using require('whatever'), then install it locally, at the root of your project.
- If you’re installing something that you want to use in your shell, on the command line or something, install it globally, so that its binaries end up in your PATH environment variable.

### Rodar uma migration. Opções:
1. Opção nº 1: `sequelize db:migrate`
2. Opção nº 2: `npx sequelize db:migrate`

### Reverter uma migration (a última)
1. `sequelize-cli db:migrate:undo`
2. `npx sequelize-cli db:migrate:undo`
- Reverter a migração, ajudar o arquivo de migration e rodar a migration de novo.
- Se for uma alteração de uma migration antiga, é mais fácil criar uma nova migration que altera o que é preciso.

#### Observação
- Para o caso de uma migration para excluir uma tabela, a lógica é a mesma da criação, mas invertemos a lógica de dentro do
up and down, ou seja, meu up será para excluir e, se der erro, eu crio novamente.

<!--> Criação de um banco de dados para não depender do pgAdmin. Esse seria o primeiro passo do projeto se o banco não existisse <-->
### Criar um banco de dados. Opções:
1. Opção nº 1: `sequelize db:create`
2. Opção nº 2: `npx sequelize db:create`

#### Observação
- Em aula nós estávamos indo direto no pgAdmin e criando o banco manualmente. Em seguida, estávamos colocando o nome do novo banco dentro do .env

## Novas Bibliotecas utilizadas:

### instalar o sequelize
`npm install sequelize` 
### instalar o driver do PostgreSQL
`npm install pg` 
### instalar o CLI do sequelize
`npm install -g sequelize-cli` 
### instalar o dotenv
`npm install dotenv`
### instalar o JsonWebToken ( JWT )
`npm install jsonwebtoken`

## Listar o que tem instalado (coloquei a mais como lembrete e estudo)
### To list globally installed packages with npm, you can use the npm ls command combined with the -g flag (short for global):
`npm ls -g`
### Alternatively, to list locally installed packages present in the node_modules folder of a project, you can navigate to your project and run the npm ls command (without the -g flag)
`npm ls`