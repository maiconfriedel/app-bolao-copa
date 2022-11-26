import { prismaClient } from "../prisma/prismaClient";

class ListUsersUseCase {
  async execute() {
    const users = await prismaClient.user.findMany();

    return users.map((user) => {
      return { ...user, password: undefined };
    });
  }
}

export { ListUsersUseCase };
