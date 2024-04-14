import { Router } from "express";
import categoryController from "../controller/categoryController";
import isAutheticated from "../middlewares/authetication";
import PermissonsRestrict from "../middlewares/permission";

let CategoryController = new categoryController();
let CategoryRouter : Router = Router();

CategoryRouter.post("/createCategory",isAutheticated,PermissonsRestrict,CategoryController.CreateCategory);
CategoryRouter.put("/UpdateCategory/:id",isAutheticated,PermissonsRestrict,CategoryController.UpdateCategory);
CategoryRouter.get("/GetCategoryById/:id",isAutheticated,PermissonsRestrict,CategoryController.GetCategoryById);
CategoryRouter.get("/GetAllCategorys",isAutheticated,PermissonsRestrict,CategoryController.GetAllCategories);
CategoryRouter.delete("/DeleteCategory/:id",isAutheticated,PermissonsRestrict,CategoryController.DeleteCategory);
CategoryRouter.delete("/BulkDeleteCategorys",isAutheticated,PermissonsRestrict,CategoryController.BulkDeleteCategory); 


export default CategoryRouter;