"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRepository_1 = __importDefault(require("../../repository/authRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthServiceImplementation {
    constructor() {
        this.CreateUser = async (userData) => {
            if (userData.password == null || userData.password == undefined) {
                return { error: "Password is required", status: 400 };
            }
            else {
                let salt = await bcryptjs_1.default.genSalt(10);
                let password = await bcryptjs_1.default.hash(userData.password, salt);
                userData = JSON.parse(JSON.stringify(userData));
                userData["password"] = password;
                let response = await this.repository.CreateUser(userData);
                return response;
            }
        };
        this.UpdateUser = async (id, userData) => {
            if (id == null || id == undefined) {
                return { error: "user id is required", status: 400 };
            }
            else {
                if (userData.password == null || userData.password == undefined) {
                    let response = await this.repository.UpdateUser(id, userData);
                    console.log(response);
                    return response;
                }
                else {
                    let salt = await bcryptjs_1.default.genSalt(10);
                    let password = await bcryptjs_1.default.hash(userData.password, salt);
                    userData = JSON.parse(JSON.stringify(userData));
                    userData["password"] = password;
                    let response = await this.repository.UpdateUser(id, userData);
                    console.log(response);
                    return response;
                }
            }
        };
        this.GetUserById = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.GetUserById(id);
                return response;
            }
        };
        this.GetAllUsers = async (page, limit) => {
            if (page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0) {
                page = 0;
                limit = 10;
            }
            let offset = (page - 1) * limit;
            let response = await this.repository.GetAllUsers(offset, limit);
            return response;
        };
        this.GetUserByName = async (name) => {
            if (name == null || name == undefined) {
                return { error: "name is required", status: 400 };
            }
            else {
                let response = await this.repository.GetUserByName(name);
                return response;
            }
        };
        this.DeleteUser = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.DeleteUser(id);
                return response;
            }
        };
        this.BulkDeleteUsers = async (ids) => {
            let response = await this.repository.BulkDeleteUsers(ids);
            return response;
        };
        this.repository = new authRepository_1.default();
    }
}
exports.default = AuthServiceImplementation;
