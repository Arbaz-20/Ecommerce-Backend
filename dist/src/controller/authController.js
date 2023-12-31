"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthServiceImplementation_1 = __importDefault(require("../service/implementation/AuthServiceImplementation"));
const PermissionServiceImplementation_1 = __importDefault(require("../service/implementation/PermissionServiceImplementation"));
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
class AuthController {
    constructor() {
        this.destination = "src/utils/upload/user";
        this.CreateUser = async (req, res) => {
            let userData = req.body;
            let file = req.file;
            if (userData.permission == null || userData.permission == undefined) {
                res.status(400).json({ error: "Please provide the permission to user" });
            }
            else {
                if (userData.name == undefined || userData.email == undefined || userData.password == undefined || userData.name == null || userData.email == null || userData.password == null) {
                    res.status(400).json({ error: "please provide the required fields" });
                }
                else {
                    try {
                        if (file == null || file == undefined) {
                            let response = this.createUserData(userData);
                            if ((await response).message || (await response).status == 400) {
                                res.status((await response).status).json({ error: (await response).message });
                            }
                            else {
                                res.status((await response).status).json({ message: (await response).message });
                            }
                        }
                        else {
                            if (file.mimetype?.split("/")[1] == "jpg" || file.mimetype?.split("/")[1] == "png" || file.mimetype?.split("/")[1] == "jpeg") {
                                let stream = stream_1.Readable.from(file.buffer);
                                let filename = file.originalname?.replaceAll(" ", "_");
                                let filePath = `${this.destination}/${filename?.split(".")[0] + "_" + this.getTimeStamp() + "." + filename?.split(".")[1]}`;
                                let writer = fs_1.default.createWriteStream(filePath);
                                stream.pipe(writer);
                                let url = `${process.env.server}/${filePath}`;
                                userData["image"] = url;
                                let response = this.createUserData(userData);
                                if ((await response).message && (await response).status == 400) {
                                    res.status(400).json({ error: (await response).message });
                                }
                                else {
                                    res.status(200).json({ message: (await response).message });
                                }
                            }
                            else {
                                res.status(400).json({ error: "Please Select either png or jpg or jpeg file" });
                            }
                        }
                    }
                    catch (error) {
                        this.print(error);
                        if (error.errors) {
                            let validationerror = [];
                            for await (let response of error.errors) {
                                let obj = {
                                    path: "",
                                    message: ""
                                };
                                obj.path = response.path,
                                    obj.message = response.message;
                                validationerror.push(obj);
                            }
                            res.status(400).json({ errors: validationerror });
                        }
                        else {
                            res.status(400).json({ errors: error.message });
                        }
                    }
                }
            }
        };
        this.UpdateUser = async (req, res) => {
            let userData = req.body;
            let { id } = req.params;
            let destination = "src/utils/upload/user";
            let file = req.file;
            let stream = new stream_1.Stream();
            if (id == null || id == undefined) {
                res.status(404).json({ error: "please provide id to update" });
            }
            else {
                try {
                    let isExist = await this.auth_service.GetUserById(id);
                    if (isExist == null || isExist == undefined) {
                        res.status(400).json({ error: "please select user properly" });
                    }
                    else {
                        if (file == null || file == undefined) {
                            let data = await this.updateUserData(userData, id);
                            if (data.message || data.status == 400) {
                                res.status(data.status).json({ error: data.message });
                            }
                            else if (data.message || data.status == 200) {
                                res.status(data.status).json({ error: data.message });
                            }
                            else {
                                res.status(400).json({ error: "Something went wrong" });
                            }
                        }
                        else {
                            if (isExist.image == null || isExist.image == undefined) {
                                if (file.originalname?.split(".")[1] == "jpeg" || file.originalname?.split(".")[1] == "png" || file.originalname?.split(".")[1] == "jpg") {
                                    let streamData = stream_1.Readable.from(file.buffer);
                                    let filename = file.originalname?.replaceAll(" ", "_");
                                    let filePath = `${this.destination}/${filename?.split(".")[0] + "_" + this.getTimeStamp() + "." + filename?.split(".")[1]}`;
                                    let writer = fs_1.default.createWriteStream(filePath);
                                    streamData.pipe(writer);
                                    userData["image"] = `${process.env.server}/${filePath}`;
                                    let updateResponse = await this.updateUserData(userData, id);
                                    if (updateResponse.status == 200) {
                                        res.status(200).json({ message: updateResponse.message });
                                    }
                                    else {
                                        res.status(400).json({ error_message: updateResponse.message });
                                    }
                                }
                                else {
                                    res.status(400).json({ error_message: "Plese select either png or jpeg or jpg file format" });
                                }
                            }
                            else {
                                let imageName = isExist.image.split("/");
                                let filenameData = imageName[imageName.length - 1];
                                fs_1.default.rm(`${destination}/${filenameData}`, (error) => { console.log(error); });
                                let streamData = stream_1.Readable.from(file.buffer);
                                let filename = file.originalname?.replaceAll(" ", "_");
                                let filePath = `${this.destination}/${filename?.split(".")[0] + "_" + this.getTimeStamp() + "." + filename?.split(".")[1]}`;
                                let writer = fs_1.default.createWriteStream(filePath);
                                streamData.pipe(writer);
                                userData["image"] = `${process.env.server}/${filePath}`;
                                let updateResponse = await this.updateUserData(userData, id);
                                if (updateResponse.status == 200) {
                                    res.status(200).json({ message: updateResponse.message });
                                }
                                else {
                                    res.status(400).json({ error: updateResponse.message });
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                    if (error.errors) {
                        let validationerror = [];
                        for await (let response of error.errors) {
                            let obj = {
                                path: "",
                                message: ""
                            };
                            obj.path = response.path;
                            obj.message = response.message;
                            validationerror.push(obj);
                        }
                        res.status(400).json({ errors: validationerror });
                    }
                    else {
                        res.status(400).json({ errors: error.message });
                    }
                }
            }
        };
        this.LoginUser = async (req, res) => {
        };
        this.GetUserById = async (req, res) => {
            let id = req.params.id;
            if (id == null || id == undefined) {
                res.status(404).json({ error: "please provide id" });
            }
            else {
                try {
                    let userResponse = await this.auth_service.GetUserById(id);
                    if (userResponse == null || userResponse == undefined) {
                        res.status(400).json({ error: "Something went wrong please try again" });
                    }
                    else {
                        res.status(200).json({ data: userResponse });
                    }
                }
                catch (error) {
                    res.status(400).json({ error: error.message });
                }
            }
        };
        this.GetAllUsers = async (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            try {
                let userResponse = await this.auth_service.GetAllUsers(Number(page), limit);
                if (userResponse == null || userResponse == undefined || page == undefined || limit == undefined || page == null || limit == null) {
                    res.status(400).json({ error: "Something went wrong please try again" });
                }
                else {
                    res.status(200).json({ data: userResponse });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        };
        this.DeleteUser = async (req, res) => {
            let id = req.params?.id;
            try {
                let userResponse = await this.auth_service.DeleteUser(id);
                if (userResponse == null || userResponse == undefined) {
                    res.status(400).json({ error: "Something went wrong please try again" });
                }
                else if (userResponse.error || userResponse.status == 400) {
                    res.status(userResponse.status).json({ error: userResponse.error });
                }
                else {
                    let permissions = await this.permissionService.DeletePermissionByUserId(id);
                    if (permissions != null || permissions != undefined) {
                        res.status(200).json({ message: "deleted Sucessfully" });
                    }
                    else {
                        res.status(400).json({ error: "couldnot able to delete" });
                    }
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        };
        this.BulkDeleteUser = async (req, res) => {
            let ids = req.body.ids;
            let errors = [];
            let success = [];
            try {
                for await (let id of ids) {
                    if (id != null || id != undefined || id != "") {
                        let isExist = await this.auth_service.GetUserById(id);
                        if (isExist !== null || isExist !== undefined) {
                            let permission = await this.permissionService.getPermissionByUserId(id);
                            if (permission != null || permission != undefined) {
                                let response = await this.permissionService.DeletePermissionByUserId(id);
                                if (response > 0) {
                                    let response = await this.auth_service.DeleteUser(id);
                                    if (Number(response) > 0) {
                                        success.push(`${isExist.name} Deleted Successfully`);
                                    }
                                    else {
                                        errors.push(`${isExist.name} cannot be deleted please try again`);
                                    }
                                }
                                else {
                                    errors.push(`${isExist.name} couldn't Delete plese try again`);
                                }
                            }
                        }
                    }
                }
                if (errors.length > 0) {
                    res.status(400).json({ error: errors });
                }
                else if (errors.length > 0, success.length > 0) {
                    res.status(400).json({ success: success, error: errors });
                }
                else {
                    res.status(200).json({ success: success, message: "All Deleted Successfully" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        };
        this.createUserData = async (userData) => {
            let permission = JSON.parse(userData.permission);
            let userResponse = await this.auth_service.CreateUser(userData);
            if (userResponse == null || userResponse == undefined) {
                return { message: "Something went wrong please try again", status: 400 };
            }
            else if (userResponse.error || userResponse.status == 400) {
                return { message: userResponse.error, status: userResponse.status };
            }
            else {
                permission[0]["userId"] = userResponse.id;
                let permissionResponse = await this.permissionService.CreatePermission(permission[0]);
                if (permissionResponse == null || permissionResponse == undefined) {
                    return { message: "Something went wrong please try again", status: userResponse.status };
                }
                else {
                    return { message: "Sign Up Sucessfully", status: 200 };
                }
            }
        };
        this.updateUserData = async (userData, id) => {
            let permission = JSON.parse(userData.permission);
            let userResponse = await this.auth_service.UpdateUser(id, userData);
            if (userResponse == null || userResponse == undefined) {
                return { message: "Something went wrong please try again", status: 400 };
            }
            else if (userResponse < 1) {
                return { message: "Cannot Update please try again", status: 400 };
            }
            else if (userResponse.error || userResponse.status == 400) {
                return { message: userResponse.error, status: userResponse.status };
            }
            else {
                let response = await this.permissionService.DeletePermissionByUserId(id);
                console.log("this is the permission response", response);
                if (response > 0) {
                    permission[0]["userId"] = id;
                    let permissionResponse = await this.permissionService.CreatePermission(permission[0]);
                    if (permissionResponse == null || permissionResponse == undefined) {
                        return { message: "Something went wrong please try again", status: userResponse.status };
                    }
                    else {
                        return { message: "Updated Sucessfully", status: 200 };
                    }
                }
                else {
                    return { message: "Permission cannot updated please try again", status: 400 };
                }
            }
        };
        this.getTimeStamp = () => {
            return Math.floor(Date.now() / 1000);
        };
        this.print = async (message) => {
            return console.log(message);
        };
        this.auth_service = new AuthServiceImplementation_1.default();
        this.permissionService = new PermissionServiceImplementation_1.default();
    }
}
exports.default = AuthController;
