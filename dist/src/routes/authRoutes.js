"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const multer_1 = __importDefault(require("multer"));
let authController = new authController_1.default();
let AuthRouter = (0, express_1.Router)();
let upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
AuthRouter.post("/createUser", upload.single('image'), authController.CreateUser);
AuthRouter.put("/updateUser/:id", upload.single('image'), authController.UpdateUser);
AuthRouter.get("/GetUserById/:id", authController.GetUserById);
AuthRouter.get("/GetAllUsers", authController.GetAllUsers);
AuthRouter.delete("/DeleteUser/:id", authController.DeleteUser);
AuthRouter.delete("/BulkDeleteUser", authController.BulkDeleteUser);
exports.default = AuthRouter;
