import { Router } from "express";
import ProductController from "../controller/productController";
import multer from "multer"; 
import isAutheticated from "../middlewares/authetication";
import PermissonsRestrict from '../middlewares/permission'
import RolesRestrict from "../middlewares/Role";
let productController = new ProductController();
let ProductRouter : Router = Router();

let upload = multer({
    storage : multer.memoryStorage()
});

ProductRouter.post("/createProduct",isAutheticated,upload.single('image'),RolesRestrict,PermissonsRestrict,productController.createProduct);
ProductRouter.put("/UpdateProduct/:id",upload.single('image'),isAutheticated,RolesRestrict,PermissonsRestrict,productController.UpdateProduct);
ProductRouter.get("/GetProductById/:id",isAutheticated,RolesRestrict,PermissonsRestrict,productController.GetProductById);
ProductRouter.get("/GetAllProducts",isAutheticated,RolesRestrict,PermissonsRestrict,productController.GetAllProducts);
ProductRouter.delete("/DeleteProduct/:id",isAutheticated,RolesRestrict,PermissonsRestrict,productController.DeleteProduct);
ProductRouter.delete("/BulkDeleteProduct",isAutheticated,RolesRestrict,PermissonsRestrict,productController.BulkDeleteProduct);

export default ProductRouter ;