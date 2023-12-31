"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductServiceImplementation_1 = __importDefault(require("../service/implementation/ProductServiceImplementation"));
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
class productController {
    constructor() {
        this.destination = "src/utils/upload/product";
        this.createProduct = async (req, res) => {
            let productdata = req.body;
            let file = req.file;
            if (productdata.name == null || productdata.name == undefined || productdata.name == "") {
                res.status(404).json({ error: "Product not found" });
            }
            else {
                try {
                    if (file == null || file == undefined) {
                        let response = await this.product_service?.createProduct(productdata);
                        if (response != null || response != undefined) {
                            res.status(200).json({ message: "Product created successfully" });
                        }
                        else {
                            res.status(404).json({ error: "could not able to create product" });
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
                            productdata["image"] = url;
                            let productResponse = await this.product_service?.createProduct(productdata);
                            if (productResponse == null || productResponse == undefined) {
                                res.status(400).json({ error: "Something went wrong please try again" });
                            }
                            else if (productResponse.error || productResponse.status == 400) {
                                res.status(productResponse.status).json({ error: productResponse.error });
                            }
                            else {
                                res.status(200).json({ message: `${productResponse.name} created succcesfully`, data: productResponse });
                            }
                        }
                    }
                }
                catch (error) {
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
        };
        this.UpdateProduct = async (req, res) => {
            let productdata = req.body;
            let id = req.params?.id;
            let file = req.file;
            let destination = "src/utils/upload/product";
            let stream = new stream_1.Stream();
            if (id == null || id == undefined) {
                res.status(404).json({ error: "please provide id to update" });
            }
            else {
                try {
                    let isExist = await this.product_service.GetProductById(id);
                    if (isExist == null || isExist == undefined) {
                        res.status(400).json({ error: "please select product properly" });
                    }
                    else {
                        if (file == null || file == undefined) {
                            let productResponse = await this.product_service.UpdateProduct(id, productdata);
                            if (productResponse == null || productResponse == undefined) {
                                res.status(400).json({ error: "Something went wrong please try again" });
                            }
                            else if (productResponse.error || productResponse.status) {
                                res.status(productResponse.status).json({ error: productResponse.error });
                            }
                            else {
                                if (productResponse > 0) {
                                    res.status(200).json({ message: "updated Sucessfully" });
                                }
                                else {
                                    res.status(200).json({ message: "Couldnt updated please try again" });
                                }
                            }
                        }
                        else {
                            if (isExist.image == null || isExist.image == undefined || isExist.image == "") {
                                if (file.originalname?.split(".")[1] == "jpeg" || file.originalname?.split(".")[1] == "png" || file.originalname?.split(".")[1] == "jpg") {
                                    let streamData = stream_1.Readable.from(file.buffer);
                                    let filename = file.originalname?.replaceAll(" ", "_");
                                    let filepath = `${this.destination}/${filename?.split(".")[0] + "_" + this.getTimeStamp() + "." + filename?.split(".")[1]}`;
                                    let writer = fs_1.default.createWriteStream(filepath);
                                    streamData.pipe(writer);
                                    productdata.image = `${process.env.server}/${filepath}`;
                                    let updateResponse = await this.product_service.UpdateProduct(id, productdata);
                                    if (updateResponse > 0) {
                                        res.status(200).json({ message: "Product updated successfully" });
                                    }
                                    else {
                                        res.status(400).json({ error_message: "error" });
                                    }
                                }
                                else {
                                    res.status(400).json({ error: "Please Select either png or jpg or jpeg file" });
                                }
                            }
                            else {
                                let imageName = isExist.image.split("/");
                                let filenamedata = imageName[imageName.length - 1];
                                fs_1.default.rm(`${destination}/${filenamedata}`, (error) => { console.log(error); });
                                let streamData = stream_1.Readable.from(file.buffer);
                                let filename = file.originalname?.replaceAll(" ", "_");
                                let filepath = `${this.destination}/${filename?.split(".")[0] + "_" + this.getTimeStamp() + "." + filename?.split(".")[1]}`;
                                let writer = fs_1.default.createWriteStream(filepath);
                                streamData.pipe(writer);
                                productdata["image"] = `${process.env.server}/${filepath}`;
                                let updateResponse = await this.product_service.UpdateProduct(id, productdata);
                                if (updateResponse > 0) {
                                    res.status(200).json({ message: "product updated successfully" });
                                }
                                else {
                                    res.status(400).json({ error: "couldn't update product" });
                                }
                            }
                        }
                    }
                }
                catch (error) {
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
        this.GetProductById = async (req, res) => {
            let id = req.params.id;
            if (id == null || id == undefined) {
                res.status(404).json({ error: "please provide id" });
            }
            else {
                try {
                    let productResponse = await this.product_service?.GetProductById(id);
                    if (productResponse == null || productResponse == undefined) {
                        res.status(400).json({ error: "Something went wrong please try again" });
                    }
                    else {
                        res.status(200).json({ data: productResponse });
                    }
                }
                catch (error) {
                    res.status(400).json({ error: error.message });
                }
            }
        };
        this.GetAllProducts = async (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            try {
                let productResponse = await this.product_service?.GetAllProduct(Number(page), limit);
                if (productResponse == null || productResponse == undefined || page == undefined || limit == undefined || page == null || limit == null) {
                    res.status(400).json({ error: "Something went wrong please try again" });
                }
                else {
                    res.status(200).json({ data: productResponse });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        };
        this.DeleteProduct = async (req, res) => {
            let id = req.params?.id;
            try {
                let productResponse = await this.product_service?.DeleteProduct(id);
                if (productResponse == null || productResponse == undefined) {
                    res.status(400).json({ error: "Something went wrong please try again" });
                }
                else if (productResponse.error || productResponse.status == 400) {
                    res.status(productResponse.status).json({ error: productResponse.error });
                }
                else {
                    res.status(200).json({ message: "deleted Sucessfully" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        };
        this.BulkDeleteProduct = async (req, res) => {
            let ids = req.body.ids;
            let errors = [];
            let success = [];
            try {
                for await (let id of ids) {
                    if (id != null || id != undefined || id != "") {
                        let isExist = await this.product_service?.GetProductById(id);
                        if (isExist !== null || isExist !== undefined) {
                            let response = await this.product_service?.DeleteProduct(id);
                            if (response == undefined || response == null) {
                                errors.push(`Please select the product properly to delete`);
                            }
                            else if (Number(response) > 0) {
                                success.push(`${isExist.name} Deleted Sucessfully`);
                            }
                            else {
                                errors.push(`${isExist.name} couldn't Delete plese try again`);
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
                    res.status(400).json({ success: success, message: "All Deleted Successfully" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        };
        this.getTimeStamp = () => {
            return Math.floor(Date.now() / 1000);
        };
        this.product_service = new ProductServiceImplementation_1.default();
    }
}
exports.default = productController;
