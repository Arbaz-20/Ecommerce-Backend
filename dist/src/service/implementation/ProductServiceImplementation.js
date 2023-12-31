"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productRepository_1 = __importDefault(require("../../repository/productRepository"));
class ProductServiceImplementation {
    constructor() {
        this.createProduct = async (productData) => {
            if (productData == null || productData == undefined) {
                return { error: "productData not found", status: 400 };
            }
            else {
                let response = await this.repository.createProduct(productData);
                return response;
            }
        };
        this.UpdateProduct = async (id, productData) => {
            if (id == null || id == undefined) {
                return { error: "product id is required", status: 400 };
            }
            else {
                let response = await this.repository.UpdateProduct(id, productData);
                console.log(response);
                return response;
            }
        };
        this.GetProductById = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.GetProductById(id);
                return response;
            }
        };
        this.GetAllProduct = async (page, limit) => {
            if (page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0) {
                page = 0;
                limit = 10;
            }
            let offset = (page - 1) * limit;
            let response = await this.repository.GetAllProduct(offset, limit);
            return response;
        };
        this.GetProductByName = async (name) => {
            if (name == null || name == undefined) {
                return { error: "name is required", status: 400 };
            }
            else {
                let response = await this.repository.GetProductByName(name);
                return response;
            }
        };
        this.DeleteProduct = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.DeleteProduct(id);
                return response;
            }
        };
        this.BulkDeleteProduct = async (ids) => {
            let response = await this.repository.BulkDeleteProduct(ids);
            return response;
        };
        this.repository = new productRepository_1.default();
    }
}
exports.default = ProductServiceImplementation;
