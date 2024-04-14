import { Router } from "express";
import OrderController from "../controller/orderController";
import isAutheticated from "../middlewares/authetication";
import PermissonsRestrict from "../middlewares/permission";

let orderController = new OrderController();
let OrderRouter : Router = Router();

OrderRouter.post("/CreateOrder",isAutheticated,PermissonsRestrict,orderController.CreateOrder);
OrderRouter.put("/UpdateOrder/:id",isAutheticated,PermissonsRestrict,orderController.UpdateOrder);
OrderRouter.put("/UpdateOrderStatus/:id",isAutheticated,PermissonsRestrict,orderController.UpdateOrderStatus);
OrderRouter.put("/UpdatePaymentStatus/:id",isAutheticated,PermissonsRestrict,orderController.UpdatePaymentStatus)
OrderRouter.get("/GetOrderById/:id",isAutheticated,PermissonsRestrict,orderController.GetOrderById);
OrderRouter.get("/GetAllOrders",isAutheticated,PermissonsRestrict,orderController.GetAllOrders);
OrderRouter.delete("/DeleteOrder/:id",isAutheticated,PermissonsRestrict,orderController.DeleteOrder);
OrderRouter.delete("/BulkDeleteOrders",isAutheticated,PermissonsRestrict,orderController.BulkDeleteOrders); 


export default OrderRouter;