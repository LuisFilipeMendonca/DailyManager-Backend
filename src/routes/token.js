import { Router } from "express";

import tokenController from "../controllers/Token";

const router = new Router();

router.post("/", tokenController.post);

export default router;
