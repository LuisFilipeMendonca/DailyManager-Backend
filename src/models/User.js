import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

import dbConfig from "../config/database";
import Contact from "./Contact";

const sequelize = new Sequelize(dbConfig);

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isEmail: {
          msg: "Please enter a valid email",
        },
        isUnique: async function (value, next) {
          const user = await User.findOne({ where: { email: value } });

          if (user) {
            return next("Email already in use");
          }
          return next();
        },
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: {
          args: [8, 24],
          msg: "Your password needs to have between 8 and 24 characters",
        },
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      field: "password_hash",
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        const passwordHashed = await bcrypt.hash(user.password, 8);

        user.passwordHash = passwordHashed;
      },
    },
    sequelize,
    modelName: "User",
  }
);

export default User;
