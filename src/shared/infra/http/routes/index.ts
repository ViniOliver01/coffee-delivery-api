import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { coffeeRoutes } from "./coffee.routes";
import { passwordRoutes } from "./password.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use("/coffee", coffeeRoutes);
router.use("/specifications", specificationsRoutes);
router.use(authenticateRoutes);

export { router };
