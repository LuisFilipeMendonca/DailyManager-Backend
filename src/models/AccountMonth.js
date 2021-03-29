import { Sequelize, DataTypes, Model } from "sequelize";

import dbConfig from "../config/database";
import Account from "./Account";

const sequelize = new Sequelize(dbConfig);

class AccountMonth extends Model {}

AccountMonth.init(
  {
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A date is required",
        },
        notNull: {
          msg: "A date is required",
        },
      },
    },
    profit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    expenses: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "AccountMonth",
  }
);

AccountMonth.belongsTo(Account, { foreignKey: "accountId" });
Account.hasMany(AccountMonth, { foreignKey: "accountId" });

export default AccountMonth;
