import { Request, Response } from "express";
import { ValidationException } from "../models/exceptions/ValidationException";

export function handleUseCaseError(error: any, req: Request, res: Response) {
  if (error instanceof ValidationException) {
    return res.status(400).json(error);
  } else {
    return res.status(500).json({
      message: error.message,
    });
  }
}
