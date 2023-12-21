import { Router } from "express";
import ProductController from "../controller/productController";
import multer from "multer"; 

let productController = new ProductController();
let ProductRouter : Router = Router();

let upload = multer({
    storage : multer.memoryStorage()
});

ProductRouter.post("/createProduct",upload.single('image'),productController.createProduct);
ProductRouter.put("/UpdateProduct/:id",productController.UpdateProduct);
ProductRouter.get("/GetProductById/:id",productController.GetProductById);
ProductRouter.get("/GetAllProducts",productController.GetAllProducts);
ProductRouter.delete("/DeleteProduct/:id",productController.DeleteProduct);
ProductRouter.delete("/BulkDeleteProduct",productController.BulkDeleteProduct);

export default ProductRouter ;