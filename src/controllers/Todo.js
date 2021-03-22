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
        return res.status(400).json({ errorMsg: "Something went wrong" });
      }

      return res.status(200).json(todo);
    } catch (e) {
      console.log(e);
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
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const todo = await Todo.findByPk(id);

      if (!todo) {
        return res
          .status(400)
          .json({ errorMsg: "The todo you're trying to delete dont't exist." });
      }

      todo.destroy();

      return res.status(200).json({ msg: "Todo deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const todo = await Todo.findByPk(id);

      if (!todo) {
        return res.status(400).json({
          errorMsg: "The todo you're trying to update doesn't exist",
        });
      }

      await todo.update(req.body);

      return res.status(200).json(todo);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TodoController();
