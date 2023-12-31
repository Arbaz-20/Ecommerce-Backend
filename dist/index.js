"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./src/config/database"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./src/routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./src/routes/orderRoutes"));
database_1.default.sync({ alter: true }).then(() => {
    console.log("Database is connected successfully");
}).catch((error) => {
    console.log(error);
});
dotenv_1.default.config();
let app = (0, express_1.default)();
let port = process.env.PORT;
app.use(express_1.default.static("./src/utils/upload"));
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/product", productRoutes_1.default);
app.use("/api/order", orderRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is accesssing on port : ${port}`);
});
