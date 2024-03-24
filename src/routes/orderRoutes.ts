import { Router } from "express";
import OrderController from "../controller/orderController";
import isAutheticated from "../middlewares/authetication";

let orderController = new OrderController();
let OrderRouter : Router = Router();

OrderRouter.post("/CreateOrder",orderController.CreateOrder);
OrderRouter.put("/UpdateOrder/:id",orderController.UpdateOrder);
OrderRouter.put("/UpdateOrderStatus/:id",orderController.UpdateOrderStatus);
OrderRouter.put("/UpdatePaymentStatus/:id",orderController.UpdatePaymentStatus)
OrderRouter.get("/GetOrderById/:id",orderController.GetOrderById);
OrderRouter.get("/GetAllOrders",orderController.GetAllOrders);
OrderRouter.delete("/DeleteOrder/:id",orderController.DeleteOrder);
OrderRouter.delete("/BulkDeleteOrders",orderController.BulkDeleteOrders); 


export default OrderRouter;