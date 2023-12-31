"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permissionRepository_1 = __importDefault(require("../../repository/permissionRepository"));
class PermissionServiceImplementation {
    constructor() {
        this.CreatePermission = async (PermissionData) => {
            let response = await this.repository.CreatePermission(PermissionData);
            return response;
        };
        this.UpdatePermission = async (id, PermissionData) => {
            let response = await this.repository.UpdatePermission(id, PermissionData);
            return response;
        };
        this.UpdatePermissionByUserId = async (user_id, PermissionData) => {
            let response = await this.repository.UpdatePermissionByUserId(user_id, PermissionData);
            return response;
        };
        this.GetPermissionById = async (id) => {
            let response = await this.repository.GetPermissionById(id);
            return response;
        };
        this.getPermissionByUserId = async (user_id) => {
            let response = await this.repository.getPermissionByUserId(user_id);
            return response;
        };
        this.GetAllPermissions = async (page, limit) => {
            let response = await this.repository.GetAllPermissions(page, limit);
            return response;
        };
        this.DeletePermission = async (id) => {
            let response = await this.repository.DeletePermission(id);
            return response;
        };
        this.DeletePermissionByUserId = async (userId) => {
            let response = await this.repository.DeletePermissionByUserId(userId);
            return response;
        };
        this.BulkDeletePermissionsByUserId = async (userId) => {
            let response = await this.repository.BulkDeletePermissionsByUserId(userId);
            return response;
        };
        this.BulkDeletePermissions = async (ids) => {
            let response = await this.repository.BulkDeletePermissions(ids);
            return response;
        };
        this.repository = new permissionRepository_1.default();
    }
}
exports.default = PermissionServiceImplementation;
