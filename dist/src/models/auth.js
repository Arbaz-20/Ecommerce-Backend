"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const countrysMasterFile_1 = __importDefault(require("../utils/masterFiles/countrysMasterFile"));
const auth = database_1.default.define("auths", {
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
    email: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isEmail: {
                msg: "Invalid Email",
            }
        },
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        // validate:{
        //     notEmpty:{
        //         msg:"Please provide a password"
        //     },
        //     notNull:{
        //         msg:"Please provide a password"
        //     }
        // },
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    country: {
        type: sequelize_1.DataTypes.ENUM,
        values: countrysMasterFile_1.default,
        get() {
            let country = this.getDataValue('country');
            let data = countrysMasterFile_1.default.includes(country);
            return (data == false ? "Invalid Country" : country);
        }
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
exports.default = auth;
