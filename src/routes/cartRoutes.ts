import { Router } from "express";
import cartController from "../controller/cartController";
import isAutheticated from "../middlewares/authetication";
import PermissonsRestrict from "../middlewares/permission";

let CartController = new cartController();
let cartRouter : Router = Router();

cartRouter.post("/createCart",isAutheticated,PermissonsRestrict,CartController.createCart);
cartRouter.put("/updateCart/:id",isAutheticated,PermissonsRestrict,CartController.updateCart);
cartRouter.get("/GetCartById/:id",isAutheticated,PermissonsRestrict,CartController.GetCartById);
cartRouter.get("/GetCartByUserId/:user_id",isAutheticated,PermissonsRestrict,CartController.GetCartByUserId);
cartRouter.get("/GetAllCarts",isAutheticated,PermissonsRestrict,CartController.GetAllCarts);
cartRouter.delete("/DeleteCart/:id",isAutheticated,PermissonsRestrict,CartController.DeleteCart);
cartRouter.delete("/BulkDeleteCarts",isAutheticated,PermissonsRestrict,CartController.BulkDeleteCarts);

export default cartRouter;