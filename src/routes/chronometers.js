import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";

import chronometerController from "../controllers/Chronometer";

const router = new Router();

router.post("/", loginRequired, chronometerController.post);
router.get("/", loginRequired, chronometerController.get);
router.delete("/:id", loginRequired, chronometerController.delete);
router.put("/:id", loginRequired, chronometerController.update);

export default router;
