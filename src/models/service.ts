import prismaClient from "./prismaClient";
import servicesEntity from "./entity/service";
import ServiceRequest from "./dto/service";
import ParamsService from "./dto/paramsService";
import PrismaErrorResponse from "./entity/primaErrorResponse";
import { InternalServerError, NotFoundError } from "../utils/errorClass";
import removeUndifined from "../utils/removeUndifined"

class ServiceModel {
  static async createService(
    service: ServiceRequest
  ): Promise<servicesEntity | any> {
    try {
      return await prismaClient.service.create({
        data: service,
      });
    } catch (error) {
      throw new InternalServerError("Error creating service");
    }
  }

  static async getAllServices(
    params: ParamsService,
    page: number,
    take: number
  ): Promise<servicesEntity[] | any> {
    const newPage = page | 1;
    try {
      if (!params.category && !params.location && !params.rating) {
        console.log(page + "1");
        const result = await prismaClient.service.findMany({
          skip: (newPage - 1) * take,
          take: take,
        });
        console.log(result);
        return result;
      } else {
        const newParams = { ...params };
        const result = await prismaClient.service.findMany({
          where: {...removeUndifined(newParams)},
          skip: (newPage - 1) * take,
          take: take,
        });
        return result;
      }
    } catch (error) {
      throw new InternalServerError("" + error);
    }
  }
  static async getServiceById (serviceId: string): Promise<servicesEntity | any> {
    try {
      return await prismaClient.service.findUnique({
        where: {
          serviceId: serviceId,
        },
      });
    } catch (error) {
      throw new NotFoundError("Service not found");
    }
  }
}

export default ServiceModel;
