import { Router } from "express";

import todoController from "../controllers/Todo";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, todoController.post);
router.get("/:date", loginRequired, todoController.get);
router.delete("/:id", loginRequired, todoController.delete);
router.put("/:id", loginRequired, todoController.update);

export default router;
