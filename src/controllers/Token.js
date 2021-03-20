import jwt from "jsonwebtoken";

import User from "../models/User";
import Contact from "../models/Contact";
import Todo from "../models/Todo";

class TokenController {
  async post(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        errorMsg: "The email provided doesn't exist. Try register first.",
      });
    }

    if (!(await user.isPasswordValid(password))) {
      return res.status(400).json({
        errorMsg: "The password provided is invalid",
      });
    }

    const { id, name } = user;
    const token = jwt.sign({ email, id }, "secret", { expiresIn: "1h" });

    return res.status(200).json({ id, token, email, name });
  }
}

export default new TokenController();
