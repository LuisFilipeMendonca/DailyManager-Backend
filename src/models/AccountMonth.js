import { Sequelize, DataTypes, Model } from "sequelize";

import dbConfig from "../config/database";
import AccountYear from "./AccountYear";

const sequelize = new Sequelize(dbConfig);

class AccountMonth extends Model {}

AccountMonth.init(
  {
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

AccountMonth.belongsTo(AccountYear, { foreignKey: "yearId" });
AccountYear.hasMany(AccountMonth, { foreignKey: "yearId" });

export default AccountMonth;
