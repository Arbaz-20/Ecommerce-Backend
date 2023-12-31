"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const multer_1 = __importDefault(require("multer"));
let productController = new productController_1.default();
let ProductRouter = (0, express_1.Router)();
let upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
ProductRouter.post("/createProduct", upload.single('image'), productController.createProduct);
ProductRouter.put("/UpdateProduct/:id", upload.single('image'), productController.UpdateProduct);
ProductRouter.get("/GetProductById/:id", productController.GetProductById);
ProductRouter.get("/GetAllProducts", productController.GetAllProducts);
ProductRouter.delete("/DeleteProduct/:id", productController.DeleteProduct);
ProductRouter.delete("/BulkDeleteProduct", productController.BulkDeleteProduct);
exports.default = ProductRouter;
