import { Router } from "express";
import favouriteController from "../controller/favouriteController";
import isAutheticated from "../middlewares/authetication";
import PermissonsRestrict from "../middlewares/permission";

let favouritesController = new favouriteController();
let favouritesRouter : Router = Router();

favouritesRouter.post("/createfavourites",isAutheticated,PermissonsRestrict,favouritesController.createfavourites);
favouritesRouter.put("/updatefavourites/:id",isAutheticated,PermissonsRestrict,favouritesController.updatefavourites);
favouritesRouter.get("/GetfavouritesById/:id",isAutheticated,PermissonsRestrict,favouritesController.GetfavouritesById);
favouritesRouter.get("/GetAllFavouritesByauthId/:id",isAutheticated,PermissonsRestrict,favouritesController.GetAllFavouritesByauthId);
favouritesRouter.get("/GetAllfavouritess",isAutheticated,PermissonsRestrict,favouritesController.GetAllfavourites);
favouritesRouter.delete("/Deletefavourites/:id",isAutheticated,PermissonsRestrict,favouritesController.Deletefavourites);
favouritesRouter.delete("/BulkDeletefavourites",isAutheticated,PermissonsRestrict,favouritesController.BulkDeletefavourites);

export default favouritesRouter;