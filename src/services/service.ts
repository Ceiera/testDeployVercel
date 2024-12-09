import ServiceRequest from "../models/dto/service";
import servicesEntity from "../models/entity/service";
import ServiceModel from "../models/service";
import ParamsService from "../models/dto/paramsService";

class ServiceSerivce {
  async createService(service: ServiceRequest): Promise<servicesEntity | any> {
    try {
      const result = await ServiceModel.createService(service);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllService(params: ParamsService, page:number): Promise<servicesEntity | any> {
    try {
      const result = await ServiceModel.getAllServices(params, page, 10);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default ServiceSerivce;
