"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const permissions = database_1.default.define("permissions", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4(),
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
    },
    create: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    edit: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    update: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    delete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    view: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now')
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now')
    }
});
exports.default = permissions;
