import { Request, Response } from "express";
import UserEntity from "../models/entity/user";
import UserRequest from "../models/dto/user";
import UserService from "../services/user";
import ResponseClass from "../utils/responseClass";
import { HttpError } from "../utils/errorClass";

class UserController {
  async registerUser(req: Request, res: Response): Promise<UserEntity | any> {
    try {
      if (!req.body.email || !req.body.password || !req.body.name) {
        return res
          .status(400)
          .json(new ResponseClass("Missing fields", null, 400));
      }

      if (req.body.password.length < 8) {
        return res
          .status(400)
          .json(
            new ResponseClass(
              "Password must be at least 8 characters",
              null,
              400
            )
          );
      }

      const user: UserRequest = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      };

      const result = await new UserService().registerUser(user);
      delete result.password;
      return res.status(201).json(new ResponseClass("success", result, 201));
    } catch (error: any) {
      const httpError = error as HttpError;
      return res
        .status(httpError.statusCode)
        .json(
          new ResponseClass("" + httpError.message, null, httpError.statusCode)
        );
    }
  }

  async loginUser(req: Request, res: Response): Promise<String | any> {
    try {
      if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json(new ResponseClass("Missing fields", null, 400));
      }
      const user: UserRequest = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await new UserService().loginUser(user);
      return res.status(200).json(new ResponseClass("success", result, 200));
    } catch (error) {
      const httpError = error as HttpError;
      return res
        .status(httpError.statusCode)
        .json(
          new ResponseClass("" + httpError.message, null, httpError.statusCode)
        );
    }
  }

  async updateUserById(req: Request, res: Response): Promise<UserEntity | any> {
    try {
      const user: UserRequest = {
        ...req.body,
      };
      const userId = req.params.userId as string;
      if (!user || !userId) {
        return res
          .status(400)
          .json(new ResponseClass("Missing fields", null, 400));
      }

      const result = await new UserService().updateUserById(userId, user);
      return res.status(200).json(new ResponseClass("success", result, 200));
    } catch (error) {
      const httpError = error as HttpError;
      return res
        .status(httpError.statusCode)
        .json(
          new ResponseClass("" + httpError.message, null, httpError.statusCode)
        );
    }
  }
  async deleteUserById(req: Request, res: Response): Promise<UserEntity | any> {
    try {
      const userId = req.params.userId as string;
      if (!userId) {
        return res
          .status(400)
          .json(new ResponseClass("Missing params", null, 400));
      }

      const result = await new UserService().deleteUserById(userId);
      return res.status(200).json(new ResponseClass("success", null, 200));
    } catch (error) {
      const httpError = error as HttpError;
      return res
        .status(httpError.statusCode)
        .json(
          new ResponseClass("" + httpError.message, null, httpError.statusCode)
        );
    }
  }
}

export default UserController;
