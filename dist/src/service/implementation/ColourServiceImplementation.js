"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colourRepository_1 = __importDefault(require("../../repository/colourRepository"));
class ColourServiceImplementation {
    constructor() {
        this.createColour = async (colourData) => {
            if (colourData == null || colourData == undefined) {
                return { error: "colourData not found", status: 400 };
            }
            else {
                let response = await this.repository.createColour(colourData);
                return response;
            }
        };
        this.UpdateColour = async (id, colourData) => {
            if (id == null || id == undefined) {
                return { error: "colour id is required", status: 400 };
            }
            else {
                let response = await this.repository.UpdateColour(id, colourData);
                console.log(response);
                return response;
            }
        };
        this.GetColourById = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.GetColourById(id);
                return response;
            }
        };
        this.GetAllColour = async (page, limit) => {
            if (page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0) {
                page = 0;
                limit = 10;
            }
            let offset = (page - 1) * limit;
            let response = await this.repository.GetAllColour(offset, limit);
            return response;
        };
        this.GetColourByName = async (name) => {
            if (name == null || name == undefined) {
                return { error: "name is required", status: 400 };
            }
            else {
                let response = await this.repository.GetColourByName(name);
                return response;
            }
        };
        this.DeleteColour = async (id) => {
            if (id == null || id == undefined) {
                return { error: "id is required", status: 400 };
            }
            else {
                let response = await this.repository.DeleteColour(id);
                return response;
            }
        };
        this.BulkDeleteColour = async (ids) => {
            let response = await this.repository.BulkDeleteColour(ids);
            return response;
        };
        this.repository = new colourRepository_1.default();
    }
}
;
exports.default = ColourServiceImplementation;
