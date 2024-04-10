import { Router } from "express";
import AuthController from "../controller/authController";
import multer from "multer"; 
import PermissonsRestrict from "../middlewares/permission";
import RolesRestrict from "../middlewares/Role";

let authController = new AuthController();
let AuthRouter : Router = Router();

let upload = multer({
    storage : multer.memoryStorage()
});

AuthRouter.post("/createUser",upload.single('image'),authController.CreateUser);
AuthRouter.post("/loginController",authController.LoginController)
AuthRouter.put("/updateUser/:id",upload.single('image'),authController.UpdateUser);
AuthRouter.get("/GetUserById/:id",authController.GetUserById);
AuthRouter.get("/GetAllUsers",RolesRestrict,PermissonsRestrict,authController.GetAllUsers);
AuthRouter.delete("/DeleteUser/:id",authController.DeleteUser);
AuthRouter.delete("/BulkDeleteUser",authController.BulkDeleteUser);
AuthRouter.delete("/logoutController",authController.logoutController)


export default AuthRouter;