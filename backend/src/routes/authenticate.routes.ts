import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authenticateRoutes.post("/login", authenticateUserController.post);
authenticateRoutes.post(
  "/login/refresh_token",
  authenticateUserController.postRefreshToken
);

export { authenticateRoutes };
