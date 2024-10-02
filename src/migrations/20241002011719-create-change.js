'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Changes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      scope: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.JSON,
        references: {
          model: 'PurchaseOrder',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      user_id: {
        type: Sequelize.JSON,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
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
    await queryInterface.dropTable('Changes');
  }
};