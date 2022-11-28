import { Request, Response } from "express";
import { handleUseCaseError } from "../handlers/handleUseCaseError";
import { UserSchema } from "../models/schemas/user.schema";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { ListUsersUseCase } from "../useCases/ListUsersUseCase";

class UserController {
  async get(req: Request, res: Response) {
    try {
      const listUsersUseCase = new ListUsersUseCase();
      const users = await listUsersUseCase.execute();

      return res.json(users);
    } catch (error: any) {
      handleUseCaseError(error, req, res);
    }
  }

  async post(req: Request, res: Response) {
    try {
      const validationResult = UserSchema.validate(req.body, {
        abortEarly: false,
      });

      if (validationResult.error) {
        return res.status(400).json(validationResult.error);
      }

      const { name, email, password, avatar_url } = req.body;

      const createUserUseCase = new CreateUserUseCase();
      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        avatar_url,
      });

      return res.json(user);
    } catch (error: any) {
      handleUseCaseError(error, req, res);
    }
  }
}

export { UserController };
