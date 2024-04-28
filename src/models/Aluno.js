const { DataTypes } = require('sequelize')
const { connection } = require("../database/connection");
const { hash } = require("bcryptjs")

// define é o método para conectar com uma tabela específica. Passa a tabela e as colunas que quero conectar.
// Meu DataTypes não veio sozinho, precisei importar manualmente.
const Aluno = connection.define('alunos', {
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    nome: {
        type: DataTypes.STRING
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    celular: {
        type: DataTypes.STRING
    }
})

// Hooks (gatilhos) Sequelize - Ações que o próprio Sequelize permite usarmos.
Aluno.beforeSave(async (aluno) => {
    aluno.password = await hash(aluno.password, 8)
})

module.exports = Aluno