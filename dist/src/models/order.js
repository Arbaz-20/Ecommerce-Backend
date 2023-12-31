"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const orderstatus_1 = __importDefault(require("../utils/masterFiles/orderstatus"));
const paymentstatus_1 = __importDefault(require("../utils/masterFiles/paymentstatus"));
const order = database_1.default.define("orders", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4(),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Name cannot be empty"
            },
            notNull: {
                msg: "Name cannot be empty"
            }
        },
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    product_no: {
        type: sequelize_1.DataTypes.STRING
    },
    order_status: {
        type: sequelize_1.DataTypes.ENUM,
        values: orderstatus_1.default,
        get() {
            let order_status = this.getDataValue('order_status');
            let data = order_status.includes(order_status);
            return (data == false ? "Invalid status" : order_status);
        }
    },
    payment_status: {
        type: sequelize_1.DataTypes.ENUM,
        values: paymentstatus_1.default,
        get() {
            let payment_status = this.getDataValue('payment_status');
            let data = payment_status.includes(payment_status);
            return (data == false ? "invalid status" : payment_status);
        }
    },
    GST_tax: {
        type: sequelize_1.DataTypes.STRING
    },
    delivery_charges: {
        type: sequelize_1.DataTypes.INTEGER
    },
    delivery_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    order_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now')
    },
    order_price: {
        type: sequelize_1.DataTypes.STRING
    },
    discount_price: {
        type: sequelize_1.DataTypes.STRING
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
exports.default = order;
