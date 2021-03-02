import { Op } from "sequelize";

import Todo from "../models/Todo";

class TodoController {
  async post(req, res) {
    try {
      const { time, date, description } = req.body;

      const data = {
        description,
        date: new Date(`${date}:${time}`),
        userId: 1,
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
      const { userId, date } = req.params;

      const minDate = new Date(+date);
      const maxDate = new Date(+date + 24 * 60 * 60 * 1000);

      console.log("MinDate:", minDate);
      console.log("MaxDate:", maxDate);

      const todos = await Todo.findAll({
        where: {
          userId,
          date: {
            [Op.and]: {
              [Op.gte]: minDate,
              [Op.lt]: maxDate,
            },
          },
        },
        order: [["date", "ASC"]],
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
      const { time, date, description } = req.body;
      const data = {
        description,
        date: new Date(`${date}:${time}`),
      };

      const todo = await Todo.findByPk(id);

      if (!todo) {
        return res.status(400).json({
          errorMsg: "The todo you're trying to update doesn't exist",
        });
      }

      await todo.update(data);

      return res.status(200).json(todo);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TodoController();
