import { Router } from "express";

import accountController from "../controllers/Account";

const router = new Router();

router.post("/", accountController.post);

export default router;
