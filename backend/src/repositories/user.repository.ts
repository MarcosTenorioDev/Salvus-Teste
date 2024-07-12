import { IUser, IUserCreate, UserRepository } from "../interfaces/user.interface";
import { prisma } from "../db/prisma-client";

class UserRepositoryPrisma implements UserRepository {
    async create(data: IUserCreate): Promise<IUser> {
        try {
          return await prisma.user.create({
            data: {
              externalId: data.externalId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            },
          });
        } catch (error) {
          throw new Error("Unable to create user");
        }
      }

      async findByEmail(email: string): Promise<IUser | null> {
        try {
          return await prisma.user.findFirst({
            where: {
              email,
            },
          });
        } catch (error) {
          throw new Error("Failed to find user by email");
        }
      }

}

export {UserRepositoryPrisma}