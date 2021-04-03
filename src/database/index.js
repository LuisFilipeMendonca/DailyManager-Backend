import { Sequelize } from "sequelize";
import dbConfig from "../config/database";

export const sequelize = new Sequelize(dbConfig);
