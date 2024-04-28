const { DataTypes } = require('sequelize')
const { connection } = require("../database/connection");

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

module.exports = Aluno