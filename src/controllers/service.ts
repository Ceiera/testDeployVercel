import ResponseClass from "../utils/responseClass";
import { HttpError } from "../utils/errorClass";
import ServiceRequest from "../models/dto/service";
import ServiceSerivce from "../services/service";
import { Request, Response } from "express";

import UserTokenEntity from "../models/entity/userToken";
import ParamsService from "../models/dto/paramsService";

interface AuthRequest extends Request {
  user?: UserTokenEntity;
}

class ServiceController {
  async createService(req: AuthRequest, res: Response): Promise<any> {
    try {
      if (
        !req.body.name ||
        !req.body.description ||
        !req.body.price ||
        !req.body.category ||
        !req.body.location
      ) {
        return res
          .status(400)
          .json(new ResponseClass("Missing fields", null, 400));
      }
      const service: ServiceRequest = {
        userId: req.user?.userId ? req.user?.userId : "0",
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        location: req.body.location,
      };
      const result = await new ServiceSerivce().createService(service);
      return res.status(201).json(new ResponseClass("success", result, 201));
    } catch (error) {
      const httpError = error as HttpError;
      return res
        .status(httpError.statusCode)
        .json(
          new ResponseClass("" + httpError.message, null, httpError.statusCode)
        );
    }
  }

  async getAllServices(req: AuthRequest, res: Response): Promise<any> {
    try {
      const page = parseInt(req.query.page as string, 10);
      if (page < 1) {
        return res
          .status(400)
          .json(new ResponseClass("Error Params", null, 400));
      }
      const params = {
        location: req.query.location,
        category: req.query.category,
        rating: req.query.rating,
      };
      const clean: ParamsService = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      );
      const result = await new ServiceSerivce().getAllService(clean, page);
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
}

export default ServiceController;
