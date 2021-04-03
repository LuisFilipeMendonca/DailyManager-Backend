import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Account from "./Account";

class AccountMonth extends Model {}

AccountMonth.init(
  {
    year: {
      type: DataTypes.INTEGER,
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
