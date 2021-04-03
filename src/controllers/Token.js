import jwt from "jsonwebtoken";

import User from "../models/User";

class TokenController {
  async post(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json([
          {
            field: "email",
            errorMsg: "The email provided doesn't exist. Try register first.",
          },
        ]);
      }

      if (!(await user.isPasswordValid(password))) {
        return res.status(400).json([
          {
            field: "password",
            errorMsg: "The password provided is invalid",
          },
        ]);
      }

      console.log(process.env);

      const { id, name } = user;
      const token = jwt.sign({ email, id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_SECRET,
      });

      return res.status(200).json({ id, token, email, name });
    } catch (e) {
      const errors = e.errors.map((error) => ({
        field: error.path,
        errorMsg: error.message,
      }));
      return res.status(400).json(errors);
    }
  }
}

export default new TokenController();
