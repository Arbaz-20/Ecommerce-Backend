"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const sequelize_1 = require("sequelize");
class ProductRepository {
    constructor() {
        this.createProduct = async (productData) => {
            return await product_1.default.create(productData);
        };
        this.UpdateProduct = async (id, productData) => {
            return await product_1.default.update(productData, { where: { id: id } });
        };
        this.GetProductById = async (id) => {
            return await product_1.default.findByPk(id);
        };
        this.GetAllProduct = async (page, limit) => {
            return await product_1.default.findAndCountAll({
                offset: page,
                limit: limit,
            });
        };
        this.GetProductByName = async (name) => {
            return await product_1.default.findAll({ where: { name: { [sequelize_1.Op.iLike]: `%${name}%` } } });
        };
        this.DeleteProduct = async (id) => {
            return await product_1.default.destroy({ where: { id: id } });
        };
        this.BulkDeleteProduct = async (ids) => {
            return await product_1.default.destroy({ where: { id: ids } });
        };
    }
}
exports.default = ProductRepository;
