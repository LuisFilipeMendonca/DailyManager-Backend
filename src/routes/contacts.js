import { Router } from "express";

import contactController from "../controllers/Contact";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, contactController.get);
router.post("/", loginRequired, contactController.post);
router.put("/:id", loginRequired, contactController.update);
router.delete("/:id", loginRequired, contactController.delete);

export default router;
