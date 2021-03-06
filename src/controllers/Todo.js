import sequelize, { fn } from "sequelize";

import Todo from "../models/Todo";

class TodoController {
  async post(req, res) {
    try {
      const { time, date, description } = req.body;

      const data = {
        description,
        time: time.length > 0 ? time : null,
        date: new Date(date),
        userId: req.userId,
      };

      const todo = await Todo.create(data);

      if (!todo) {
        return res
          .status(500)
          .json({ errorMsg: "Something went wrong. Try again later." });
      }

      return res.status(200).json(todo);
    } catch (e) {
      const errors = e.errors.map((error) => ({
        field: error.path,
        errorMsg: error.message,
      }));
      return res.status(400).json(errors);
    }
  }

  async get(req, res) {
    try {
      const { date } = req.params;
      const userId = req.userId;

      const todos = await Todo.findAll({
        where: {
          userId,
          date: new Date(+date),
        },
        order: [fn("isnull", sequelize.col("time")), ["time", "ASC"]],
      });

      return res.status(200).json(todos);
    } catch (e) {
      return res
        .status(500)
        .json({ errorMsg: "Something went wrong. Try again later." });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const todo = await Todo.findByPk(id);

      if (!todo) {
        return res
          .status(404)
          .json({ errorMsg: "The todo you're trying to delete dont't exist." });
      }

      todo.destroy();

      return res.status(200).json({ msg: "Todo deleted successfully" });
    } catch (e) {
      return res
        .status(500)
        .json({ errorMsg: "Something went wrong. Try again later." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const todo = await Todo.findByPk(id);

      if (!todo) {
        return res.status(404).json({
          errorMsg: "The todo you're trying to update doesn't exist",
        });
      }

      await todo.update(req.body);

      return res.status(200).json(todo);
    } catch (e) {
      const errors = e.errors.map((error) => ({
        field: error.path,
        errorMsg: error.message,
      }));
      return res.status(400).json(errors);
    }
  }
}

export default new TodoController();
