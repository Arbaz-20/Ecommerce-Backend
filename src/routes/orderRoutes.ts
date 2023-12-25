import { Router } from "express";
import OrderController from "../controller/orderController";

let orderController = new OrderController();
let OrderRouter : Router = Router();

OrderRouter.post("/CreateOrder",orderController.CreateOrder);
OrderRouter.put("/UpdateOrder/:id",orderController.UpdateOrder);
OrderRouter.get("/GetOrderById/:id",orderController.GetOrderById);
//OrderRouter.get("/GetAllOrders",orderController.GetAllOrders);
OrderRouter.delete("/DeleteOrder/:id",orderController.CreateOrder);
OrderRouter.delete("/BulkDeleteOrders",orderController.BulkDeleteOrders); 


export default OrderRouter;