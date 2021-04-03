import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import AccountMonth from "./AccountMonth";

class AccountTransaction extends Model {}

AccountTransaction.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "An amount is required",
        },
        notNull: {
          msg: "An amount is required",
        },
        isNumeric: {
          msg: "The mount needs to be a number",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A description is required",
        },
        notNull: {
          msg: "A description is required",
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A type is required",
        },
        notNull: {
          msg: "A type is required",
        },
      },
    },
    transactionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "transaction_date",
      validate: {
        notEmpty: {
          msg: "A date is required",
        },
        notNull: {
          msg: "A date is required",
        },
      },
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
