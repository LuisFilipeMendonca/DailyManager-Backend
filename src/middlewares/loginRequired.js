import jwt from "jsonwebtoken";
import User from "../models/User";

const loginRequired = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ errorMsg: "You need to login into your account" });
    }

    const [_, token] = authorization.split(" ");

    const { id } = jwt.verify(token, "secret");

    if (!id) {
      return res.status(401).json({
        errorMsg: "Your session expired. Login into your account again.",
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(401)
        .json({ errorMsg: "Your account doesnt exist. Try to register first" });
    }

    req.userId = id;

    next();
  } catch (e) {
    return res.status(401).json({
      errorMsg: "Your session expired. Login into your account again",
    });
  }
};

export default loginRequired;
