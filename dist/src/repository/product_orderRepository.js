"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_order_1 = __importDefault(require("../models/product_order"));
const sequelize_1 = require("sequelize");
class product_orderRepository {
    constructor() {
        this.createProduct_order = async (product_orderData) => {
            return await product_order_1.default.create(product_orderData);
        };
        this.UpdateProduct_order = async (id, product_orderData) => {
            return await product_order_1.default.update(product_orderData, { where: { id: id } });
        };
        this.GetProductById_order = async (id) => {
            return await product_order_1.default.findByPk(id);
        };
        this.GetAllProduct_order = async (page, limit) => {
            return await product_order_1.default.findAndCountAll({
                offset: page,
                limit: limit,
            });
        };
        this.GetProduct_orderByName = async (name) => {
            return await product_order_1.default.findAll({ where: { name: { [sequelize_1.Op.iLike]: `%${name}%` } } });
        };
        this.DeleteProduct_order = async (id) => {
            return await product_order_1.default.destroy({ where: { id: id } });
        };
        this.BulkDeleteProduct_order = async (ids) => {
            return await product_order_1.default.destroy({ where: { id: ids } });
        };
    }
}
exports.default = product_orderRepository;
