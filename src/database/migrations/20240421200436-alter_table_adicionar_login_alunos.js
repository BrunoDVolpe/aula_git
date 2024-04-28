'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /* Se fosse num projeto real, essas informações estariam já na primeira migração. Nesse exemplo, estamos alterando um
    banco já criado. Os campos email e senha são obrigatórios. Como já temos usuários criados no nosso banco, para podermos
    corrigir nosso banco e criar essas colunas como obrigatórias temos 3 opções:
    - Deletar o banco (já que ainda são dados fictícios) e começar de novo já colocando email e password
    - Setar email e password como allowNull = true, tratar os usuários já criados e depois rodar uma migration pra deixar essa
    propriedade como false
    - Setar um valor default pra lidar com os campos que já existem e, depois de tratados todos os usuários, remover esse
     default value */
    await queryInterface.addColumn('alunos', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'email@gmail.com'
    });

    await queryInterface.addColumn('alunos', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'teste123'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('alunos', 'email');
    await queryInterface.removeColumn('alunos', 'password');
  }
};