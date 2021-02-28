import { Router } from "express";

import todoController from "../controllers/Todo";

const router = new Router();

router.post("/", todoController.post);
router.get("/:userId/:date", todoController.get);
router.delete("/:id", todoController.delete);
router.put("/:id", todoController.update);

export default router;
