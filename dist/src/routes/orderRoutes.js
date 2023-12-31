"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controller/orderController"));
let orderController = new orderController_1.default();
let OrderRouter = (0, express_1.Router)();
OrderRouter.post("/CreateOrder", orderController.CreateOrder);
OrderRouter.put("/UpdateOrder/:id", orderController.UpdateOrder);
OrderRouter.get("/GetOrderById/:id", orderController.GetOrderById);
OrderRouter.get("/GetAllOrders", orderController.GetAllOrders);
OrderRouter.delete("/DeleteOrder/:id", orderController.DeleteOrder);
OrderRouter.delete("/BulkDeleteOrders", orderController.BulkDeleteOrders);
exports.default = OrderRouter;
