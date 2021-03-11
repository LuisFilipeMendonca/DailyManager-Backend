import { Sequelize, DataTypes, Model } from "sequelize";

import dbConfig from "../config/database";
import AccountMonth from "./AccountMonth";

const sequelize = new Sequelize(dbConfig);

class AccountTransaction extends Model {}

AccountTransaction.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AccountTransaction",
  }
);

AccountTransaction.belongsTo(AccountMonth, { foreignKey: "monthId" });
AccountMonth.hasMany(AccountTransaction, { foreignKey: "monthId" });

export default AccountTransaction;
