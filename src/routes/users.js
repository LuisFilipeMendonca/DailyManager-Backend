import { Router } from "express";

import userController from "../controllers/User";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", userController.post);

export default router;
