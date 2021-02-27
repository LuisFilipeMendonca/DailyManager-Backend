import User from "../models/User";

class UserController {
  async post(req, res) {
    try {
      const data = { ...req.body };

      const user = await User.create(data);

      return res.status(200).json({ user });
    } catch (e) {
      console.log("Controller:", e);
    }
  }
}

export default new UserController();
