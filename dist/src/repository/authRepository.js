"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../models/auth"));
const sequelize_1 = require("sequelize");
class AuthRepository {
    constructor() {
        this.CreateUser = async (userData) => {
            return await auth_1.default.create(userData);
        };
        this.UpdateUser = async (id, userData) => {
            return await auth_1.default.update(userData, { where: { id: id } });
        };
        this.GetUserById = async (id) => {
            return await auth_1.default.findByPk(id);
        };
        this.GetAllUsers = async (page, limit) => {
            return await auth_1.default.findAndCountAll({
                offset: page,
                limit: limit,
            });
        };
        this.GetUserByName = async (name) => {
            return await auth_1.default.findAll({ where: { name: { [sequelize_1.Op.iLike]: `%${name}%` } } });
        };
        this.DeleteUser = async (id) => {
            return await auth_1.default.destroy({ where: { id: id } });
        };
        this.BulkDeleteUsers = async (ids) => {
            return await auth_1.default.destroy({ where: { id: ids } });
        };
    }
}
exports.default = AuthRepository;
