"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("account_months", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      profit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      expenses: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "account_id",
        references: {
          model: "accounts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "updated_at",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("account_months");
  },
};
