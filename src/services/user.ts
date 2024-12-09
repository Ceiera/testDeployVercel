import UserModel from "../models/user";
import bcrypt from "bcrypt";
import UserRequest from "../models/dto/user";
import UserEntity from "../models/entity/user";
import { ForbiddenError, NotFoundError } from "../utils/errorClass";
import jwt from "jsonwebtoken";

class UserService {
  async registerUser(user: UserRequest): Promise<UserEntity | any> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const result = await UserModel.createUser(user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(user: UserRequest): Promise<UserEntity | any> {
    try {
      const result = await UserModel.getUserByEmail(user.email);
      if (!result || result.deletedAt !== null) {
        throw new NotFoundError("User not found");
      }
      const compare = await bcrypt.compare(user.password, result.password);
      if (!compare) {
        throw new ForbiddenError("Incorrect email or password");
      } else {
        delete result.password;
        console.log(result);
        const token = jwt.sign(result, process.env.JWT_SECRET || "");
        return token;
      }
    } catch (error) {
      throw error;
    }
  }
  async updateUserById(
    userId: string,
    user: UserRequest
  ): Promise<UserEntity | any> {
    try {
      return await UserModel.updateUserById(userId, user);
    } catch (error) {
      throw user;
    }
  }
  async deleteUserById (userId: string): Promise<UserEntity | any> {
    try {
      return await UserModel.deleteUserById(userId);
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
