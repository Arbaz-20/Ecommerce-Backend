"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderRepository_1 = __importDefault(require("../../repository/orderRepository"));
class OrderServiceImplementation {
    constructor() {
        this.CreateOrder = async (OrderData) => {
            if (OrderData == null || OrderData == undefined) {
                return { error: "userdata not found", status: 400 };
            }
            else {
                let response = await this.repository.CreateOrder(OrderData);
                return response;
            }
        };
        this.UpdateOrder = async (id, OrderData) => {
            if (id == null || id == undefined) {
                return { error: "user id is required", status: 400 };
            }
            else {
                let response = await this.repository.UpdateOrder(id, OrderData);
                console.log(response);
                return response;
            }
        };
        this.GetOrderById = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.GetOrderById(id);
                return response;
            }
        };
        this.GetAllOrders = async (page, limit) => {
            if (page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0) {
                page = 0;
                limit = 10;
            }
            let offset = (page - 1) * limit;
            let response = await this.repository.GetAllOrders(offset, limit);
            return response;
        };
        this.GetOrderByName = async (name) => {
            if (name == null || name == undefined) {
                return { error: "name is required", status: 400 };
            }
            else {
                let response = await this.repository.GetOrderByName(name);
                return response;
            }
        };
        this.DeleteOrder = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.DeleteOrder(id);
                return response;
            }
        };
        this.BulkDeleteOrders = async (ids) => {
            let response = await this.repository.BulkDeleteOrders(ids);
            return response;
        };
        this.repository = new orderRepository_1.default();
    }
}
;
exports.default = OrderServiceImplementation;
