"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colour_1 = __importDefault(require("../models/colour"));
const sequelize_1 = require("sequelize");
class colourRespository {
    constructor() {
        this.createColour = async (colourData) => {
            return await colour_1.default.create(colourData);
        };
        this.UpdateColour = async (id, colourData) => {
            return await colour_1.default.update(colourData, { where: { id: id } });
        };
        this.GetColourById = async (id) => {
            return await colour_1.default.findByPk(id);
        };
        this.GetAllColour = async (page, limit) => {
            return await colour_1.default.findAndCountAll({
                offset: page,
                limit: limit,
            });
        };
        this.GetColourByName = async (name) => {
            return await colour_1.default.findAll({ where: { name: { [sequelize_1.Op.iLike]: `%${name}%` } } });
        };
        this.DeleteColour = async (id) => {
            return await colour_1.default.destroy({ where: { id: id } });
        };
        this.BulkDeleteColour = async (ids) => {
            return await colour_1.default.destroy({ where: { id: ids } });
        };
    }
}
exports.default = colourRespository;
