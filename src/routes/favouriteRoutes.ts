import { Router } from "express";
import favouriteController from "../controller/favouriteController";

let favouritesController = new favouriteController();
let favouritesRouter : Router = Router();

favouritesRouter.post("/createfavourites",favouritesController.createfavourites);
favouritesRouter.put("/updatefavourites/:id",favouritesController.updatefavourites);
favouritesRouter.get("/GetfavouritesById/:id",favouritesController.GetfavouritesById);
favouritesRouter.get("/GetAllFavouritesByauthId/:id",favouritesController.GetAllFavouritesByauthId);
favouritesRouter.get("/GetAllfavouritess",favouritesController.GetAllfavourites);
favouritesRouter.delete("/Deletefavourites/:id",favouritesController.Deletefavourites);
favouritesRouter.delete("/BulkDeletefavourites",favouritesController.BulkDeletefavourites);

export default favouritesRouter;