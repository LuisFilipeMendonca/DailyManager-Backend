import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

import User from "./User";

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
