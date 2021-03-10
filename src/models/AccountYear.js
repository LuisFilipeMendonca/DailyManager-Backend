import { Sequelize, DataTypes, Model } from "sequelize";

import dbConfig from "../config/database";
import Account from "./Account";

const sequelize = new Sequelize(dbConfig);

class AccountYear extends Model {}

AccountYear.init(
  {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AccountYear",
  }
);

AccountYear.belongsTo(Account, { foreignKey: "accountId" });
Account.hasMany(AccountYear, { foreignKey: "accountId" });

export default AccountYear;
