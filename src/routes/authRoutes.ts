import { Router } from "express";
import AuthController from "../controller/authController";

let authController = new AuthController();
let AuthRouter : Router = Router();

AuthRouter.post("/createUser",authController.CreateUser);
AuthRouter.put("/updateUser",authController.UpdateUser);
AuthRouter.get("/GetUserById",authController.GetUserById);
AuthRouter.get("/GetAllUsers",authController.GetAllUsers);
AuthRouter.delete("/DeleteUser",authController.DeleteUser);
AuthRouter.delete("/BulkDeleteUser",authController.BulkDeleteUser);


export default AuthRouter;