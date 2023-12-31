"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let database = new sequelize_1.Sequelize(process.env.MySQL_DATABASE_NAME, process.env.MySQL_USERNAME, process.env.MySQL_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
    define: {
        timestamps: false,
        freezeTableName: true,
    },
});
exports.default = database;
