"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const product_order = database_1.default.define("product_order", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4(),
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4(),
        allowNull: false,
        primaryKey: true
    },
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4(),
        allowNull: false,
        primaryKey: true
    },
    product_quantity: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4(),
        allowNull: false,
        primaryKey: true
    },
    product_colour: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4(),
        allowNull: false,
        primaryKey: true
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT
    }
});
exports.default = product_order;
