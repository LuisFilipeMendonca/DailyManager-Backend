import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import appConfig from "../config/app";
import User from "./User";

class Contact extends Model {}

Contact.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: async function (value, next) {
          const contact = await User.findByPk(this.userId, {
            include: [
              {
                model: Contact,
                where: {
                  name: value,
                },
              },
            ],
          });

          if (contact) {
            return next("Already have a contact with that name");
          }

          return next();
        },
        notEmpty: {
          msg: "A name is required",
        },
        notNull: {
          msg: "A name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
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

Contact.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Contact, { foreignKey: "userId" });

export default Contact;
