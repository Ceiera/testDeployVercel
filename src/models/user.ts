import prismaClient from "./prismaClient";
import UserEntity from "./entity/user";
import UserRequest from "./dto/user";
import PrismaErrorResponse from "./entity/primaErrorResponse";
import { ConflictError, InternalServerError } from "../utils/errorClass";

class UserModel {
  static async createUser(user: UserRequest): Promise<UserEntity | any> {
    try {
      return await prismaClient.user.create({
        data: user,
      });
    } catch (error) {
      const logError = error as PrismaErrorResponse;
      if (logError.code === "P2002") {
        throw new ConflictError("Email already exists");
      } else {
        throw new InternalServerError("Error creating user");
      }
    }
  }

  static async getUserById(userId: string): Promise<UserEntity | any> {
    try {
      return await prismaClient.user.findUnique({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new InternalServerError("Error getting user");
    }
  }

  static async getUserByEmail(email: string): Promise<UserEntity | any> {
    try {
      return await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new InternalServerError("Error getting user");
    }
  }

  static async updateUserById(
    userId: string,
    user: UserRequest
  ): Promise<UserEntity | any> {
    try {
      return await prismaClient.user.update({
        where: {
          userId: userId,
        },
        data: {...user, updateAt: new Date()},
      });
    } catch (error) {
      throw new InternalServerError("Error updating user");
    }
  }
  static async deleteUserById(userId: string): Promise<UserEntity | any> {
    try {
      return await prismaClient.user.update({
        where: {
          userId: userId,
        },
        data: {
          deletedAt: new Date(),
        }
      });
    } catch (error) {
      throw new InternalServerError("Error deleting user" + error);
    }
  }
}

export default UserModel;
