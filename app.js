import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { resolve } from "path";

dotenv.config();

import "./src/config/database";

import homeRoutes from "./src/routes/home";
import contactsRoutes from "./src/routes/contacts";
import usersRoutes from "./src/routes/users";
import todosRoutes from "./src/routes/todos";
import chronometersRoutes from "./src/routes/chronometers";
import accountsRoutes from "./src/routes/accounts";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.static(resolve(__dirname, "uploads")));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/contacts", contactsRoutes);
    this.app.use("/users", usersRoutes);
    this.app.use("/todos", todosRoutes);
    this.app.use("/chronometers", chronometersRoutes);
    this.app.use("/accounts", accountsRoutes);
  }
}

export default new App().app;
