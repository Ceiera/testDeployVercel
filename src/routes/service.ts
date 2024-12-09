import express, { Router } from "express";
import ServiceController from "../controllers/service";
import AuthMiddleWare from "../middlewares/auth";

const ServiceRouter: Router = express.Router();
const serviceController = new ServiceController();


ServiceRouter.post("/services", AuthMiddleWare.authUser ,serviceController.createService);
ServiceRouter.get("/services", AuthMiddleWare.authUser, serviceController.getAllServices);



export default ServiceRouter;
