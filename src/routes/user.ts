import express, { Router } from "express";
import UserController from "../controllers/user";

const UserRouter: Router = express.Router();
const userController = new UserController();

UserRouter.post("/users/register", userController.registerUser);
UserRouter.post("/users/login", userController.loginUser);
UserRouter.patch("/users/:userId", userController.updateUserById);
UserRouter.delete("/users/:userId", userController.deleteUserById);


export default UserRouter;
