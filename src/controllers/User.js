import User from "../models/User";
import Account from "../models/Account";

class UserController {
  async post(req, res) {
    try {
      const data = { ...req.body };

      const user = await User.create(data);
      const { id } = user;

      await Account.create({ userId: id });

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
