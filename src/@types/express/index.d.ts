import UserTokenEntity from "../../models/entity/userToken";

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenEntity;
    }
  }
}
