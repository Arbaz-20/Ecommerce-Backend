import { Router } from "express";
import categoryController from "../controller/categoryController";

let CategoryController = new categoryController();
let CategoryRouter : Router = Router();

CategoryRouter.post("/createCategory",CategoryController.CreateCategory);
CategoryRouter.put("/UpdateCategory/:id",CategoryController.UpdateCategory);
CategoryRouter.get("/GetCategoryById/:id",CategoryController.GetCategoryById);
CategoryRouter.get("/GetAllCategorys",CategoryController.GetAllCategories);
CategoryRouter.delete("/DeleteCategory/:id",CategoryController.DeleteCategory);
CategoryRouter.delete("/BulkDeleteCategorys",CategoryController.BulkDeleteCategory); 


export default CategoryRouter;