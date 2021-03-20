import { Op } from "sequelize";

import Account from "../models/Account";
import AccountMonth from "../models/AccountMonth";
import AccountTransation from "../models/AccountTransation";

import Dates from "../helpers/Dates";

class AccountController {
  async post(req, res) {
    try {
      const { transactionDate, amount, description, userId, type } = req.body;

      const date = new Dates(transactionDate);

      const account = await Account.findOrCreate({
        where: { userId },
      });

      const { id: accountId, balance } = account[0];

      const accountMonth = await AccountMonth.findOrCreate({
        where: {
          accountId,
          year: date.getYear(),
          month: date.getMonth(),
        },
      });

      const { profit, expenses, id: monthId } = accountMonth[0];

      const newProfit = type === "income" ? profit + amount : profit;
      const newExpenses = type === "income" ? expenses : expenses + amount;
      const newBalance =
        type === "income" ? balance + amount : balance - amount;

      await account[0].update({ balance: newBalance });
      await accountMonth[0].update({
        profit: newProfit,
        expenses: newExpenses,
      });

      const accountTransaction = await AccountTransation.create({
        monthId,
        description,
        amount,
        type,
      });

      return res.status(200).json(accountTransaction);
    } catch (e) {
      console.log(e);
    }
  }

  async get(req, res) {
    try {
      const { timestamps, userId } = req.params;

      const date = new Dates(+timestamps);

      const account = await Account.findOne({
        where: {
          userId,
        },
        include: [
          {
            model: AccountMonth,
            where: {
              year: date.getYear(),
            },
            include: [
              {
                model: AccountTransation,
                required: false,
                where: {
                  createdAt: {
                    [Op.gte]: date.getMinDate(),
                    [Op.lte]: date.getMaxDate(),
                  },
                },
              },
            ],
          },
        ],
      });

      if (!account) {
        return res
          .status(400)
          .json({ errorMsg: "Dont have an account created yet." });
      }

      return res.status(200).json(account);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const { id, userId } = req.params;

      const accountTransaction = await AccountTransation.findByPk(id);
      const { amount, type, createdAt } = accountTransaction;

      const date = new Dates(createdAt);

      const account = await Account.findOne({ where: { userId } });
      const { id: accountId, balance } = account;

      const accountMonth = await AccountMonth.findOne({
        where: { accountId, year: date.getYear(), month: date.getMonth() },
      });
      const { profit, expenses } = accountMonth;

      const newBalance =
        type === "income" ? balance - amount : balance + amount;
      const newProfit = type === "income" ? profit - amount : profit;
      const newExpenses = type === "income" ? expenses : expenses - amount;

      await account.update({ balance: newBalance });
      await accountMonth.update({ profit: newProfit, expenses: newExpenses });
      await accountTransaction.destroy();

      return res.status(200).json(accountTransaction);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AccountController();
