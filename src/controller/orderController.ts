import OrderServiceImplementation from "../service/implementation/OrderServiceIMplementation"
import { Request,Response } from "express"
import { ErrorStatus, ProductType } from "../utils/types/userTypes"
import {OrderData, productOrderData} from '../utils/types/orderTypes'
import Product_orderServiceImplementation from "../service/implementation/Product_orderServiceImplementation"
import ProductServiceImplementation from "../service/implementation/ProductServiceImplementation"
import CartServiceImplementation from "../service/implementation/CartServiceImplementation"
import { CartType } from "../utils/types/cartType"
import product from "../models/product"
import order_status from "../utils/masterFiles/orderstatus"

class OrderController {
    order_service: OrderServiceImplementation
    product_orderService: Product_orderServiceImplementation
    product_service: ProductServiceImplementation
    cart_service: CartServiceImplementation
  

    constructor(){
        this.order_service = new OrderServiceImplementation()
        this.product_orderService = new Product_orderServiceImplementation()
        this.product_service = new ProductServiceImplementation()
        this.cart_service = new CartServiceImplementation()
    }

    public CreateOrder = async (req:Request,res:Response) => {
        let OrderData = req.body;
        let success :Array<string> = []
        let errors:Array<string> = []
        
        if(OrderData == null|| OrderData == undefined || OrderData.name == null || OrderData.name == undefined ||OrderData.name==""||OrderData.address==null || OrderData.address== undefined||OrderData.address==""){
            res.status(400).json({error: "please provide data"})
        }else if(OrderData.user_id == null || OrderData.user_id == undefined){
            res.status(200).json({error:"User id required"});
        }
        else{
            try {
                let product = await this.cart_service.GetCartByUserId(OrderData.user_id)
                if(product.count > 0){
                    let total_price = await this.CalculateTotalPrice(product.rows)
                    OrderData["total_price"] = total_price
                    let discount_price = await this.CalculateDiscountPrice(product.rows)
                    OrderData["discount_price"] = discount_price
                    let total_discount = total_price - discount_price
                    OrderData["total_discount"] = total_discount
                    let tax = await this.CalculateTax(total_price,18)
                    OrderData["GST_tax"] = tax
                    let final_amount = total_price + OrderData.delivery_charges + tax 
                    OrderData["final_price"] = final_amount
                    let orderResponse:OrderData = await this.order_service.CreateOrder(OrderData)
                    if(orderResponse == null || orderResponse == undefined){
                        res.status(200).json({error : 'something went wrong please try again'})
                    }else{
                        for await(let product_order of product.rows){
                            let productOrderData : productOrderData = {
                                productId: product_order.productId as string,
                                orderId:orderResponse.id as string,
                                product_quantity:product_order.quantity as BigInt,
                                discount:product_order?.product?.discount as number,
                            }   
                            let response : productOrderData | ErrorStatus | any = await this.product_orderService.createProduct_order(productOrderData);
                            if(response){
                                let productResponse:{name?:string|undefined}|null = await this.product_service.GetProductNameById(product_order?.product?.id as string)
                                productResponse != undefined  ? success.push(`${productResponse.name} removed Successfully`):success.push(`product removed Successfully`);
                            }else{
                                errors.push(`Order cannot be place`);
                            }
                        }
                        
                        if(success.length > 0 && errors.length == 0){
                            let deleteCart = await this.cart_service.DeleteCartByUserId(OrderData.user_id);
                            if(typeof deleteCart == "number"){
                                if(deleteCart > 0){
                                    res.status(200).json({message:"order created succcesfully",data: orderResponse});
                                }else{
                                    res.status(400).json({error:"No product in cart please try again"});
                                }
                            }
                        }
                        else if(success.length > 0 && errors.length > 0){
                            let deleteResponse :number | {error?:string,status?:number} | undefined = await this.product_orderService.DeleteProduct_orderByOrderId(orderResponse.id as string);
                            console.log(deleteResponse)
                            if(typeof deleteResponse == "number"){
                                if(deleteResponse > 0){
                                    let response = await this.order_service.DeleteOrder(orderResponse.id as string);
                                    if(response > 0){
                                        res.status(400).json({error:"No product in cart please try again"});
                                    }
                                }
                            }
                        }
                        else{
                            res.status(400).json({error:"No product in Cart"});
                        }
                    }
                }else{
                    res.status(400).json({error:"No product in Cart"});
                }
            } catch (error:any) {
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

    public UpdateOrder = async (req : Request, res : Response )=>{
       let id = req.params.id;
       let OrderData = req.body;
       console.log(OrderData)
       if(id == null || id == undefined){
        res.status(400).json({error:"invalid id"})
       }else{
        try {
            let orderresponse = await this.order_service.UpdateOrder(id, OrderData);
            if(orderresponse == null || orderresponse == undefined){
                res.status(400).json({error : 'something went wrong please try again'})
            }else{
                res.status(200).json({message : " updated order successfully"}) 
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

    public UpdateOrderStatus = async(req : Request, res:Response) =>{
        let id = req.params.id 
        let Order_status  = req.query.Order_status as string
        console.log(Order_status)
        if(id == null || id == undefined || Order_status == null || Order_status == undefined){
            res.status(400).json({error : "id reqiured please provide id"})
        }else{
            try {
                let response = await this.order_service.UpdateOrderStatus(id,Order_status as string)
                if(response == 0){
                    res.status(400).json({error:"something went wrong"})
                }else{
                    res.status(200).json({message:"Status updated successfully"})
                }
            } catch (error:any) {
                res.status(400).json({errors:error.message})
                console.log(error)
            }
            
        }
        
    }

    public UpdatePaymentStatus = async(req: Request, res:Response)=>{
        let id = req.params.id
        let paymentStatus = req.query.paymentStatus
        if(id == null || id == undefined || paymentStatus == null || paymentStatus == undefined || id == ":id"){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let response = await this.order_service.UpdatePaymentStatus(id,paymentStatus as string)
                if(response == 0){
                    res.status(400).json({error:"something went wrong"})
                }else{
                    res.status(200).json({message:"Status updated successfully"})
                }
            } catch (error:any) {
                res.status(400).json({errors:error.message})
                console.log(error)
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
        let keyword  = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        let filterBy = req.query.filterBy
        let values = filterBy == null || filterBy == undefined || filterBy == "" ? "" : filterBy
        try {
            let orderResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.order_service.GetAllOrders(Number(page),limit,keyword,values as string);
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

    private CalculateTotalPrice = async(product:Array<CartType>):Promise<number> =>{
        let total_price = 0
        for await (let price of product){
            let priceData = Number(price.price) * Number(price.quantity)
            total_price += Number(priceData);
        }
        return total_price;
    }

    private CalculateDiscountPrice = async (product:Array<CartType>):Promise<number> => {
        let final_discount_price = 0
        for await (let price of product){
            let priceData = Number(price.price) * Number(price.quantity)
            let discount_price = (priceData * Number(price.product?.discount)) / 100
            final_discount_price += discount_price  
        }
        return final_discount_price;
    }

    private CalculateTax = async(total_price:number,tax:number):Promise<number> =>{
        let value = (Number(total_price) * Number(tax)) / 100
        return value    
    }

};

export default OrderController;