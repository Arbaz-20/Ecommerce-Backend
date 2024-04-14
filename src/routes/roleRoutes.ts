import { Router } from "express";
import roleController from "../controller/roleController";
import isAutheticated from "../middlewares/authetication";
import RolesRestrict from "../middlewares/Role";
import PermissonsRestrict from "../middlewares/permission";

let RoleController = new roleController();
let RoleRouter : Router = Router();

RoleRouter.post("/CreateRole",isAutheticated,RolesRestrict,PermissonsRestrict,RoleController.CreateRole);
RoleRouter.put("/UpdateRole/:id",isAutheticated,RolesRestrict,PermissonsRestrict,RoleController.UpdateRole);
RoleRouter.get("/GetRoleById/:id",isAutheticated,RolesRestrict,PermissonsRestrict,RoleController.GetRoleById);
RoleRouter.get("/GetAllRoles",isAutheticated,RolesRestrict,PermissonsRestrict,RoleController.GetAllRoles);
RoleRouter.delete("/DeleteRole/:id",isAutheticated,RolesRestrict,PermissonsRestrict,RoleController.DeleteRole);
RoleRouter.delete("/BulkDeleteProduct",isAutheticated,RolesRestrict,PermissonsRestrict,RoleController.BulkDeleteProduct);

export default RoleRouter;