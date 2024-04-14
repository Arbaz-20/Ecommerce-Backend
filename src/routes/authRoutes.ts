import { Router } from "express";
import AuthController from "../controller/authController";
import multer from "multer"; 
import PermissonsRestrict from "../middlewares/permission";
import RolesRestrict from "../middlewares/Role";
import isAutheticated from "../middlewares/authetication";

let authController = new AuthController();
let AuthRouter : Router = Router();

let upload = multer({
    storage : multer.memoryStorage()
});

AuthRouter.post("/createUser",upload.single('image'),authController.CreateUser);
AuthRouter.post("/loginController",authController.LoginController)
AuthRouter.put("/updateUser/:id",upload.single('image'),isAutheticated,RolesRestrict,PermissonsRestrict,authController.UpdateUser);
AuthRouter.get("/GetUserById/:id",isAutheticated,RolesRestrict,PermissonsRestrict,authController.GetUserById);
AuthRouter.get("/GetAllUsers",isAutheticated,RolesRestrict,PermissonsRestrict,authController.GetAllUsers);
AuthRouter.delete("/DeleteUser/:id",isAutheticated,RolesRestrict,PermissonsRestrict,authController.DeleteUser);
AuthRouter.delete("/BulkDeleteUser",isAutheticated,RolesRestrict,PermissonsRestrict,authController.BulkDeleteUser);
AuthRouter.delete("/logoutController",authController.logoutController)


export default AuthRouter;