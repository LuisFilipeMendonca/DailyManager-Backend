import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A first name is required",
        },
        notEmpty: {
          msg: "A first name is required",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A last name is required",
        },
        notEmpty: {
          msg: "A last name is required",
        },
      },
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
        notNull: {
          msg: "A password is required",
        },
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      field: "password_hash",
    },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.getDataValue("firstName")} ${this.getDataValue(
          "lastName"
        )}`;
      },
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

User.prototype.isPasswordValid = async function (password) {
  const isPasswordValid = await bcrypt.compare(password, this.passwordHash);
  return isPasswordValid;
};

export default User;
