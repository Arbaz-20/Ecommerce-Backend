import { Router } from "express";
import cartController from "../controller/cartController";

let CartController = new cartController();
let cartRouter : Router = Router();

cartRouter.post("/createCart",CartController.createCart);
cartRouter.put("/updateCart/:id",CartController.updateCart);
cartRouter.get("/GetCartById/:id",CartController.GetCartById);
cartRouter.get("/GetCartByUserId/:user_id",CartController.GetCartByUserId);
cartRouter.get("/GetAllCarts",CartController.GetAllCarts);
cartRouter.delete("/DeleteCart/:id",CartController.DeleteCart);
cartRouter.delete("/BulkDeleteCarts",CartController.BulkDeleteCarts);

export default cartRouter;