import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import UserTokenEntity from "../models/entity/userToken";
import { ForbiddenError, HttpError } from "../utils/errorClass";
import ResponseClass from "../utils/responseClass";

interface AuthRequest extends Request {
  user?: UserTokenEntity;
}

class AuthMiddleWare {
  static async authUser(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      let accessToken;
      if (authHeader && authHeader.startsWith("Bearer")) {
        accessToken = authHeader.split(" ")[1];
      } else {
        throw new ForbiddenError("Access token not found");
      }
      const payload = jwt.verify(
        accessToken,
        process.env.JWT_SECRET || ""
      ) as UserTokenEntity;
      const findUser = await UserModel.getUserById(payload.userId);
      if (!findUser) {
        throw new ForbiddenError("User not found");
      }
      req.user = payload;
      next();
    } catch (error: any) {
      const httpError = error as HttpError
      res.status(httpError.statusCode).json(new ResponseClass(""+httpError.message, null, httpError.statusCode))
    }
  }
}

export default AuthMiddleWare;
