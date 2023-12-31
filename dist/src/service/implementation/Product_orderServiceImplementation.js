"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_orderRepository_1 = __importDefault(require("../../repository/product_orderRepository"));
class Product_orderServiceImplementation {
    constructor() {
        this.createProduct_order = async (product_orderData) => {
            if (product_orderData == null || product_orderData == undefined) {
                return { error: "product_orderData not found", status: 400 };
            }
            else {
                let response = await this.repository.createProduct_order(product_orderData);
                return response;
            }
        };
        this.UpdateProduct_order = async (id, product_orderData) => {
            if (id == null || id == undefined) {
                return { error: "product_order id is required", status: 400 };
            }
            else {
                let response = await this.repository.UpdateProduct_order(id, product_orderData);
                console.log(response);
                return response;
            }
        };
        this.GetProductById_order = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.GetProductById_order(id);
                return response;
            }
        };
        this.GetAllProduct_order = async (page, limit) => {
            if (page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0) {
                page = 0;
                limit = 10;
            }
            let offset = (page - 1) * limit;
            let response = await this.repository.GetAllProduct_order(offset, limit);
            return response;
        };
        this.GetProduct_orderByName = async (name) => {
            if (name == null || name == undefined) {
                return { error: "name is required", status: 400 };
            }
            else {
                let response = await this.repository.GetProduct_orderByName(name);
                return response;
            }
        };
        this.DeleteProduct_order = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.DeleteProduct_order(id);
                return response;
            }
        };
        this.BulkDeleteProduct_order = async (ids) => {
            let response = await this.repository.BulkDeleteProduct_order(ids);
            return response;
        };
        this.repository = new product_orderRepository_1.default();
    }
}
;
exports.default = Product_orderServiceImplementation;
