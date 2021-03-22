import { Router } from "express";

import accountController from "../controllers/Account";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, accountController.post);
router.get("/:timestamps", loginRequired, accountController.get);
router.delete("/:userId/:id", loginRequired, accountController.delete);

export default router;
