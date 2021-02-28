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
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Todo" }
);

Todo.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Todo, { foreignKey: "userId" });

export default Todo;
