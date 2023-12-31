"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderServiceIMplementation_1 = __importDefault(require("../service/implementation/OrderServiceIMplementation"));
class OrderController {
    constructor() {
        this.CreateOrder = async (req, res) => {
            let OrderData = req.body;
            console.log(OrderData);
            if (OrderData == null || OrderData == undefined) {
                res.status(400).json({ error: "please provide the required fields" });
            }
            else {
                try {
                    let orderResponse = await this.order_service?.CreateOrder(OrderData);
                    if (orderResponse == null || orderResponse == undefined) {
                        res.status(400).json({ error: "Something went wrong please try again" });
                    }
                    else {
                        res.status(200).json({ message: "order created succcesfully", data: orderResponse });
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
        this.UpdateOrder = async (req, res) => {
            let id = req.params.id;
            let OrderData = req.body;
            console.log(OrderData);
            if (id == null || id == undefined) {
                res.status(400).json({ error: "invalid id" });
            }
            else {
                try {
                    let isExist = await this.order_service.GetOrderById(id);
                    if (isExist == null || isExist == undefined) {
                        res.status(400).json({ error: "please select user properly" });
                    }
                    else {
                        let orderresponse = await this.order_service.UpdateOrder(id, OrderData);
                        if (orderresponse == null || orderresponse == undefined) {
                            res.status(400).json({ error: 'something went wrong please try again' });
                        }
                        else {
                            res.status(200).json({ message: " updated order successfully" });
                        }
                    }
                }
                catch (error) {
                    if (error.errors) {
                        console.log(error);
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
        this.GetOrderById = async (req, res) => {
            let id = req.params.id;
            if (id == null || id == undefined) {
                res.status(404).json({ error: "please provide id" });
            }
            else {
                try {
                    let orderresponse = await this.order_service.GetOrderById(id);
                    if (orderresponse == null || orderresponse == undefined) {
                        res.status(400).json({ error: "Something went wrong please try again" });
                    }
                    else {
                        res.status(200).json({ data: orderresponse });
                    }
                }
                catch (error) {
                    res.status(400).json({ error: error.message });
                }
            }
        };
        this.GetAllOrders = async (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            try {
                let orderResponse = await this.order_service.GetAllOrders(Number(page), limit);
                if (orderResponse == null || orderResponse == undefined || page == undefined || limit == undefined || page == null || limit == null) {
                    res.status(400).json({ error: "Something went wrong please try again" });
                }
                else {
                    res.status(200).json({ data: orderResponse });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        };
        this.DeleteOrder = async (req, res) => {
            let id = req.params?.id;
            try {
                let orderResponse = await this.order_service.DeleteOrder(id);
                console.log(orderResponse);
                if (orderResponse == null || orderResponse == undefined) {
                    res.status(400).json({ error: "Something went wrong please try again" });
                }
                else if (orderResponse.error || orderResponse.status == 400) {
                    res.status(orderResponse.status).json({ error: orderResponse.error });
                }
                else {
                    res.status(200).json({ message: "deleted successfully" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: error.message });
            }
        };
        this.BulkDeleteOrders = async (req, res) => {
            let { ids } = req.body;
            let errors = [];
            let success = [];
            try {
                if (ids.length > 0) {
                    for await (let id of ids) {
                        if (id != null || id != undefined || id != "") {
                            let isExist = await this.order_service?.GetOrderById(id);
                            if (isExist !== null || isExist !== undefined) {
                                let response = await this.order_service.DeleteOrder(id);
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
                }
                else {
                    res.status(400).json({ error: "please select the order to delete" });
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
                console.log(error);
                res.status(400).json({ error: error });
            }
        };
        this.order_service = new OrderServiceIMplementation_1.default();
    }
}
;
exports.default = OrderController;
