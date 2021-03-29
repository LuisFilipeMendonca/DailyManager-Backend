import User from "../models/User";
import Account from "../models/Account";

class UserController {
  async post(req, res) {
    try {
      const data = { ...req.body };

      const user = await User.create(data);
      const { id } = user;

      const account = await Account.create({ userId: id });

      if (!user || !account) {
        return res
          .status(400)
          .json({ errorMsg: "Something went wrong. Try again later." });
      }

      return res.status(200).json(user);
    } catch (e) {
      const errors = e.errors.map((error) => ({
        field: error.path,
        errorMsg: error.message,
      }));
      return res.status(400).json(errors);
    }
  }
}

export default new UserController();
