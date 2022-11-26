import { User } from "@prisma/client";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { ValidationException } from "../models/exceptions/ValidationException";
import { prismaClient } from "../prisma/prismaClient";

class AuthenticateUserWithRefreshTokenUseCase {
  async execute(refreshToken: string) {
    const now = dayjs().unix();

    const refresh_token = await prismaClient.refreshToken.findFirst({
      where: {
        id: refreshToken,
      },
    });

    if (!refresh_token) {
      throw new ValidationException({
        message: "Error authenticating with refresh token",
        errors: ["Refresh token not found or expired"],
      });
    }

    if (now > refresh_token.expiresAt) {
      await prismaClient.refreshToken.deleteMany({
        where: {
          userId: refresh_token.userId,
        },
      });

      throw new ValidationException({
        message: "Error authenticating with refresh token",
        errors: ["Refresh token not found or expired"],
      });
    }

    const user = (await prismaClient.user.findFirst({
      where: {
        id: refresh_token.userId,
      },
    })) as User;

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

    return {
      access_token,
      user: userTokenData,
      refresh_token: refresh_token.id,
    };
  }
}

export { AuthenticateUserWithRefreshTokenUseCase };
