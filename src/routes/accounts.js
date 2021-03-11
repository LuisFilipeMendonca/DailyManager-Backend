import { Router } from "express";

import accountController from "../controllers/Account";

const router = new Router();

router.post("/", accountController.post);
router.get("/:userId/:timestamps", accountController.get);
router.delete("/:userId/:id", accountController.delete);

export default router;
