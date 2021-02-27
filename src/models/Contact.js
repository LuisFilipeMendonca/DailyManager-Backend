import { Sequelize, DataTypes, Model } from "sequelize";

import dbConfig from "../config/database";
import appConfig from "../config/app";

const sequelize = new Sequelize(dbConfig);

class Contact extends Model {}

Contact.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: async function (value, next) {
          const contact = await Contact.findOne({ where: { name: value } });

          if (contact) {
            return next("Already have a contact with that name");
          }

          return next();
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
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    photoUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${appConfig.url}/images/${this.getDataValue("photo")}`;
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "Contact",
  }
);

export default Contact;
