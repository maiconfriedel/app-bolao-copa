import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(authenticateRoutes);

export { routes };
