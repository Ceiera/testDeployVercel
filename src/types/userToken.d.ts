import UserTokenEntity from "../models/entity/userToken";

declare global {
    namespace Express {
      interface Request {
        user?: UserTokenEntity; // Add the `user` property to the Request interface
      }
    }
  }