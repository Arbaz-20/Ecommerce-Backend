"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../models/order"));
const sequelize_1 = require("sequelize");
class OrderRepository {
    constructor() {
        this.CreateOrder = async (OrderData) => {
            return await order_1.default.create(OrderData);
        };
        this.UpdateOrder = async (id, OrderData) => {
            return await order_1.default.update(OrderData, { where: { id: id } });
        };
        this.GetOrderById = async (id) => {
            return await order_1.default.findByPk(id);
        };
        this.GetAllOrders = async (page, limit) => {
            return await order_1.default.findAndCountAll({
                offset: page,
                limit: limit,
            });
        };
        this.GetOrderByName = async (name) => {
            return await order_1.default.findAll({ where: { name: { [sequelize_1.Op.iLike]: `%${name}%` } } });
        };
        this.DeleteOrder = async (id) => {
            return await order_1.default.destroy({ where: { id: id } });
        };
        this.BulkDeleteOrders = async (ids) => {
            return await order_1.default.destroy({ where: { id: ids } });
        };
    }
}
exports.default = OrderRepository;
