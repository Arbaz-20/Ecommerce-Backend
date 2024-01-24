import OrderServiceImplementation from "../service/implementation/OrderServiceIMplementation"
import { Request,Response } from "express"
import { ErrorStatus } from "../utils/types/userTypes"
import Product_orderServiceImplementation from '../service/implementation/Product_orderServiceImplementation'
import ProductServiceImplementation from "../service/implementation/ProductServiceImplementation"
import {productOrderData} from '../utils/types/orderTypes'
import { Model } from "sequelize"

class OrderController {
    order_service: OrderServiceImplementation
    product_orderService: Product_orderServiceImplementation
    product_service: ProductServiceImplementation

    constructor(){
        this.order_service = new OrderServiceImplementation()
        this.product_orderService = new Product_orderServiceImplementation()
        this.product_service = new ProductServiceImplementation()
    }

    public CreateOrder = async (req:Request,res:Response)=> {
        let OrderData = req.body
        let product = OrderData["product"]
        let success :Array<string> = []
        let error :Array<string> = []
        if(OrderData == null || OrderData == undefined){
            res.status(400).json({error : "please provide the required fields"})
        }else{
            try {
                let orderResponse : { error ? : string,status ? : number } | any  = await this.order_service?.CreateOrder(OrderData) 
                if(orderResponse == null || orderResponse == undefined){
                    res.status(400).json({error:"Order Cannot be created please try again"});
                }
                else{
                    for await(let product_order of product){
                        let productOrderData : productOrderData = {
                            productId:product_order.productId,
                            orderId:orderResponse.id,
                            product_quantity:product_order.product_quantity,
                            product_colour:product_order.product_colour,
                            discount:product_order.discount
                        }   
                        let response : productOrderData | ErrorStatus | any = await this.product_orderService.createProduct_order(productOrderData);
                        if(response){
                            let product:{name?:string|undefined}|null = await this.product_service.GetProductNameById(response.productId)
                            product != undefined  ? success.push(`${product.name} removed Successfully`):success.push(`product removed Successfully`);
                        }else{
                            error.push(`${product.name} cannot be removed`);
                        }
                    }
                    if(success.length > 0 && error.length == 0){
                        res.status(200).json({message:"order created succcesfully",data: orderResponse});
                    }else if(success.length > 0 && error.length > 0){
                        let deleteResponse :number | {error?:string,status?:number} | undefined = await this.product_orderService.DeleteProduct_orderByOrderId(orderResponse.id);
                        if(typeof deleteResponse == "number"){
                            if(deleteResponse > 0){
                                let response = await this.order_service.DeleteOrder(orderResponse.id);
                                if(response > 0){
                                    res.status(400).json({error:"Order Cannot be placed Please try again"});
                                }
                            }
                        }
                    }else{
                        res.status(400).json({error:"Order Cannot be placed Please try again"});
                    }
                    
                }
            } catch (error:any) {
                console.log(error);
                if(error.errors){
                    let validationerror : Array<object> = [];
                    for await(let response of error.errors){
                        let obj:{path : string , message : string}={
                            path: "",
                            message: ""
                        }
                        obj.path = response.path;
                        obj.message = response.message;
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors:validationerror})
                }else{
                    res.status(400).json({errors:error.message})
                }
            }
        }
    }

    public UpdateOrder = async (req : Request, res : Response )=>{
       let id = req.params.id;
       let OrderData = req.body;
       console.log(OrderData)
       if(id == null || id == undefined){
        res.status(400).json({error:"invalid id"})
       }else{
        try {
            let isExist = await this.order_service.GetOrderById(id);
            if(isExist == null || isExist == undefined){
                res.status(400).json({error: "please select user properly"})
            }else{
                let orderresponse = await this.order_service.UpdateOrder(id, OrderData);
                if(orderresponse == null || orderresponse == undefined){
                    res.status(400).json({error : 'something went wrong please try again'})
                }else{
                   res.status(200).json({message : " updated order successfully"}) 
                }
            }
        } catch ( error: any ) {
            if(error.errors){
                console.log(error)
                let validationerror : Array<object> = [];
                for await(let response of error.errors){
                    let obj:{path : string , message : string}={
                        path: "",
                        message: ""
                    }
                    obj.path = response.path;
                    obj.message = response.message;
                    validationerror.push(obj);
                }
                res.status(400).json({errors:validationerror})
            }else{
                res.status(400).json({errors:error.message})
            }
        }
       }
    }

    public GetOrderById = async (req : Request,res: Response) =>{
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
    }else{
            try {
                let orderresponse : {error ?:string,status?:number } | null = await this.order_service.GetOrderById(id);
                if(orderresponse == null || orderresponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else{
                    res.status(200).json({data: orderresponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetAllOrders = async (req : Request, res : Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        try {
            let orderResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.order_service.GetAllOrders(Number(page),limit);
            if(orderResponse == null || orderResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : orderResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }

    public DeleteOrder = async(req:Request, res:Response)  => {
        let id : string = req.params?.id;
        try {
            let orderResponse : {error?:string,status?:number} | any | number|undefined = await this.order_service.DeleteOrder(id);
            console.log(orderResponse)
            if(orderResponse == null || orderResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else if (orderResponse.error || orderResponse.status == 400){
                res.status(orderResponse.status as number).json({error:orderResponse.error});
            }
            else{
                res.status(200).json({message:"deleted successfully"})
            }
        } catch (error : any) {
            console.log(error)
            res.status(400).json({error:error.message})
        }
    }

    public BulkDeleteOrders = async(req :Request , res : Response)=> {
        let {ids} = req.body;
        let errors: string[] = [];
        let success:string[] = [];
        try {
            if(ids.length > 0){
                for await(let id of ids){
                    if(id != null || id != undefined || id != ""){
                        let isExist : { error?: string | undefined , status?: number | undefined }|any = await this.order_service?.GetOrderById(id);
                        if(isExist !== null || isExist !== undefined){
                            let response : ErrorStatus | number | undefined = await this.order_service.DeleteOrder(id);
                            if(response == undefined || response == null){
                                errors.push(`Please select the product properly to delete`);
                            }
                            else if(Number(response) > 0){
                                success.push(`${isExist.name} Deleted Sucessfully`);
                            }
                            else{
                                errors.push(`${isExist.name} couldn't Delete plese try again`);
                            }
                        }    
                    }
                }
            }
            else{
                res.status(400).json({error:"please select the order to delete"});
            }
            if(errors.length > 0){
                res.status(400).json({error:errors});
            }else if(errors.length > 0,success.length > 0){
                res.status(400).json({success:success,error:errors});
            }else{
                res.status(400).json({success:success , message:"All Deleted Successfully"});
            }
        } catch (error:any) {
            console.log(error)
            res.status(400).json({error:error})
        }
    }

};

export default OrderController;