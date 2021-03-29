import { Sequelize, DataTypes, Model } from "sequelize";
import dbConfig from "../config/database";
import User from "./User";

const sequelize = new Sequelize(dbConfig);

class Todo extends Model {}

Todo.init(
  {
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
    time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: null,
    },
    date: {
      type: DataTypes.DATEONLY,
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
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "Todo" }
);

Todo.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Todo, { foreignKey: "userId" });

export default Todo;
