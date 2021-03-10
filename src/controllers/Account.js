import Account from "../models/Account";
import AccountYear from "../models/AccountYear";
import AccountMonth from "../models/AccountMonth";
import AccountTransation from "../models/AccountTransation";

class AccountController {
  async post(req, res) {
    try {
      const { date, amount, description, userId } = req.body;

      const transationDate = new Date(date);
      const transactionYear = transationDate.getFullYear();
      const transactionMonth = transationDate.getMonth();

      const account = await Account.findOrCreate({
        where: { userId },
      });

      const { id: accountId, balance } = account[0];

      const accountYear = await AccountYear.findOrCreate({
        where: {
          accountId,
          year: transactionYear,
        },
      });

      const { id: yearId } = accountYear[0];

      const accountMonth = await AccountMonth.findOrCreate({
        where: {
          yearId,
          month: transactionMonth,
        },
      });

      const { profit, expenses, id: monthId } = accountMonth[0];

      const newProfit = amount > 0 ? profit + amount : profit;
      const newExpenses = amount < 0 ? expenses + amount : expenses;
      const newBalance = balance + amount;

      await account[0].update({ balance: newBalance });
      await accountMonth[0].update({
        profit: newProfit,
        expenses: newExpenses,
      });

      const accountTransaction = await AccountTransation.create({
        monthId,
        description,
        amount,
      });

      return res.status(200).json(accountTransaction);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AccountController();
