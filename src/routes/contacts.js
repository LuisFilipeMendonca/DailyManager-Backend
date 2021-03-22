import { Router } from "express";

import contactController from "../controllers/Contact";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/:userId", loginRequired, contactController.get);
router.post("/", contactController.post);
router.put("/:id", contactController.update);
router.delete("/:id", contactController.delete);

export default router;
