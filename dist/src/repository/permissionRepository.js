"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permission_1 = __importDefault(require("../models/permission"));
class PermissionRepository {
    constructor() {
        this.CreatePermission = async (PermissionData) => {
            return await permission_1.default.create(PermissionData);
        };
        this.UpdatePermission = async (id, PermissionData) => {
            return await permission_1.default.update(PermissionData, { where: { id: id } });
        };
        this.UpdatePermissionByUserId = async (user_id, PermissionData) => {
            return await permission_1.default.update(PermissionData, { where: { userId: user_id } });
        };
        this.GetPermissionById = async (id) => {
            return await permission_1.default.findByPk(id);
        };
        this.getPermissionByUserId = async (user_id) => {
            return await permission_1.default.findOne({ where: { userId: user_id } });
        };
        this.GetAllPermissions = async (page, limit) => {
            return await permission_1.default.findAndCountAll({
                offset: page,
                limit: limit,
            });
        };
        this.DeletePermission = async (id) => {
            return await permission_1.default.destroy({ where: { id: id } });
        };
        this.DeletePermissionByUserId = async (userId) => {
            return await permission_1.default.destroy({ where: { userId: userId } });
        };
        this.BulkDeletePermissionsByUserId = async (userId) => {
            return await permission_1.default.destroy({ where: { userId: userId } });
        };
        this.BulkDeletePermissions = async (ids) => {
            return await permission_1.default.destroy({ where: { id: ids } });
        };
    }
}
exports.default = PermissionRepository;
