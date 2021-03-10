import { Router } from "express";

import chronometerController from "../controllers/Chronometer";

const router = new Router();

router.post("/", chronometerController.post);
router.get("/:userId", chronometerController.get);
router.delete("/:id", chronometerController.delete);
router.put("/:id", chronometerController.update);

export default router;