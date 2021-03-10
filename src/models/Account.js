import { Sequelize, DataTypes, Model } from "sequelize";

import dbConfig from "../config/database";
import User from "./User";

const sequelize = new Sequelize(dbConfig);

class Account extends Model {}

Account.init(
  {
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Account",
  }
);

Account.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Account, { foreignKey: "userId" });

export default Account;
