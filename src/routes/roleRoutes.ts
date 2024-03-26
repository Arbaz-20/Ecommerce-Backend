import { Router } from "express";
import roleController from "../controller/roleController";

let RoleController = new roleController();
let RoleRouter : Router = Router();

RoleRouter.post("/CreateRole",RoleController.CreateRole);
RoleRouter.put("/UpdateRole/:id",RoleController.UpdateRole);
RoleRouter.get("/GetRoleById/:id",RoleController.GetRoleById);
RoleRouter.get("/GetAllRoles",RoleController.GetAllRoles);
RoleRouter.delete("/DeleteRole/:id",RoleController.DeleteRole);
RoleRouter.delete("/BulkDeleteProduct",RoleController.BulkDeleteProduct);

export default RoleRouter;