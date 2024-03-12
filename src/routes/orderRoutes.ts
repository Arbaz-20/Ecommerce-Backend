import { Router } from "express";
import OrderController from "../controller/orderController";
import isAutheticated from "../middlewares/authetication";

let orderController = new OrderController();
let OrderRouter : Router = Router();

OrderRouter.post("/CreateOrder",orderController.CreateOrder);
OrderRouter.put("/UpdateOrder/:id",orderController.UpdateOrder);
OrderRouter.get("/GetOrderById/:id",orderController.GetOrderById);
OrderRouter.get("/GetAllOrders",isAutheticated,orderController.GetAllOrders);
OrderRouter.delete("/DeleteOrder/:id",orderController.DeleteOrder);
OrderRouter.delete("/BulkDeleteOrders",orderController.BulkDeleteOrders); 


export default OrderRouter;