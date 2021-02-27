import { Router } from "express";

import contactController from "../controllers/Contact";

const router = new Router();

router.post("/", contactController.post);
router.put("/:id", contactController.update);
router.delete("/:id", contactController.delete);

export default router;
