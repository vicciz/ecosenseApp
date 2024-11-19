'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aparelhos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      voltagem: {
        type: Sequelize.STRING
      },
      potencia: {
        type: Sequelize.STRING
      },
      valorConsumo: {
        type: Sequelize.STRING
      },
      userId:{
        type: Sequelize.INTEGER,
        references:{
          model:'usuarios',
          key: 'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Aparelhos');
  }
};