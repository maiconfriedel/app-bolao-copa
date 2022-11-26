import { compare } from "bcrypt";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { ValidationException } from "../models/exceptions/ValidationException";
import { prismaClient } from "../prisma/prismaClient";

export type AuthenticateUserUseCaseParams = {
  email: string;
  password: string;
};

class AuthenticateUserUseCase {
  async execute({ email, password }: AuthenticateUserUseCaseParams) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !(await compare(password, user.password))) {
      throw new ValidationException({
        message: "Failed to authenticate",
        errors: ["User or password invalid"],
      });
    }

    const userTokenData = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar_url: user.avatar_url,
    };

    const access_token = sign(
      { user: userTokenData },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
        issuer: user.id,
      }
    );

    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const refresh_token = await prismaClient.refreshToken.create({
      data: {
        userId: user.id,
        expiresAt: dayjs().add(30, "days").unix(),
      },
    });

    return {
      access_token,
      user: userTokenData,
      refresh_token: refresh_token.id,
    };
  }
}

export { AuthenticateUserUseCase };
