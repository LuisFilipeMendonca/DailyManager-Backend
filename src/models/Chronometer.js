import { Sequelize, DataTypes, Model } from "sequelize";

import dbConfig from "../config/database";
import User from "../models/User";

const sequelize = new Sequelize(dbConfig);

class Chronometer extends Model {}

Chronometer.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Chronometer",
  }
);

Chronometer.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Chronometer, { foreignKey: "userId" });

export default Chronometer;
