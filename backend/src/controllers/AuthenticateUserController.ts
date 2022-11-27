import { Request, Response } from "express";
import { handleUseCaseError } from "../handlers/handleUseCaseError";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";
import { AuthenticateUserWithRefreshTokenUseCase } from "../useCases/AuthenticateUserWithRefreshTokenUseCase";

class AuthenticateUserController {
  async post(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authenticateUserUseCase = new AuthenticateUserUseCase();
      const authenticated = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return res.json(authenticated);
    } catch (error: any) {
      handleUseCaseError(error, req, res);
    }
  }

  async postRefreshToken(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;

      const authenticateUserWithRefreshTokenUseCase =
        new AuthenticateUserWithRefreshTokenUseCase();
      const authenticated =
        await authenticateUserWithRefreshTokenUseCase.execute(refresh_token);

      return res.json(authenticated);
    } catch (error: any) {
      handleUseCaseError(error, req, res);
    }
  }
}

export { AuthenticateUserController };
