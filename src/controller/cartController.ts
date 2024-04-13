import { Request,Response } from "express"
import { ErrorStatus} from "../utils/types/userTypes";
import CartServiceImplementation from "../service/implementation/CartServiceImplementation";
import { CartType } from "../utils/types/cartType";
import { Model } from "sequelize";

class CartController {
    Cart_service: CartServiceImplementation;

    constructor(){
        this.Cart_service = new CartServiceImplementation();
    }

    public createCart = async( req : Request, res :Response)=>{
        let cartData = req.body;
        if(cartData ==  null || cartData == undefined ||cartData.productId == null || cartData.productId == undefined || cartData.user_id == undefined || cartData.user_id == null){
            res.status(404).json({error : "Please provide cart details"})
        }else{
        try {
                let cartResponse : { error ? : string,status ? : number } | any  = await this.Cart_service.createCart(cartData) 
                if(cartResponse == null || cartResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else if(cartResponse.error){
                    res.status(cartResponse.status).json({error:cartResponse.error});
                }
                else{
                    res.status(200).json({message:"Cart created succcesfully"});
                }
            } catch (error:any) {
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            } 
        }
    }

    
    public updateCart = async (req : Request, res : Response ) => {
        let id = req.params.id;
        let cartData = req.body;
        if(id == null || id == undefined){
         res.status(400).json({error:"invalid id"})
        }else{
            try {
                let isExist = await this.Cart_service.GetCartById(id);
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select Cart properly"})
                }else{
                    let cartResponse = await this.Cart_service.updateCart(id, cartData);
                    console.log(cartResponse)
                    if(cartResponse == null || cartResponse == undefined){
                        res.status(400).json({error : 'something went wrong please try again'})
                    }else{
                    res.status(200).json({message : " updated Cart successfully"}) 
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
 
    public GetCartById = async (req : Request,res: Response) =>{
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let cartResponse: any = await this.Cart_service.GetCartById(id);
                if (cartResponse == null || cartResponse == undefined) {
                    res.status(400).json({ error: cartResponse });
                } else {
                    cartResponse = JSON.parse(JSON.stringify(cartResponse))
                    if(typeof(cartResponse) as any){
                        let total :number = await this.CalculatePrice(cartResponse.price , cartResponse.quantity)
                        if(typeof total == "number"){
                            //cartResponse["total_price"] = total
                            res.status(200).json({data:{total_price:total,cartResponse}});
                        }else{  
                            res.status(400).json({error:"Calculation error"});
                        }
                    }else{
                        res.status(400).json({error:"please try again"});
                    }
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetCartByUserId =async (req : Request, res: Response)=>{
        let user_id = req.params.user_id as string;
        if(user_id == null || user_id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let price:Array<number> = []
                let response:{subtotal?:number;rows:Array<CartType>; count:number} = await this.Cart_service.GetCartByUserId(user_id)
                if(response.count > 0){
                    for (let data of response.rows){
                        let calculate_price = await this.CalculatePrice(Number(data.price),Number(data.quantity));
                        if(typeof calculate_price == "number"){
                            price.push(calculate_price)
                        }
                    }
                    let total_price = await this.CompleteTotalPrice(price);
                    if(typeof total_price == "number"){
                        response = JSON.parse(JSON.stringify(response))
                        response.subtotal = total_price
                        res.status(200).json({count:response.count,subtotal:response.subtotal,rows:response.rows});
                    }else{
                        res.status(400).json({error:"Please try again"})
                    }
                }else{
                    res.status(200).json({data:response})
                }
            }  catch (error:any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetAllCarts = async (req : Request, res : Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword  = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let cartResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Cart_service.GetAllCarts(Number(page),limit,keyword);
            if(cartResponse == null || cartResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : cartResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }

    public DeleteCart = async(req:Request, res:Response)  => {
        let id : string = req.params?.id;
        try {
            let cartResponse : {error?:string,status?:number} | any | number|undefined = await this.Cart_service.DeleteCart(id);
            console.log(cartResponse)
            if(cartResponse == null || cartResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else if (cartResponse.error || cartResponse.status == 400){
                res.status(cartResponse.status as number).json({error:cartResponse.error});
            }
            else{
                res.status(200).json({message:"deleted successfully"})
            }
        } catch (error : any) {
            console.log(error)
            res.status(400).json({error:error.message})
        }
    
    }

    public BulkDeleteCarts = async(req :Request , res : Response)=> {
        let {ids} = req.body;
        let errors: string[] = [];
        let success:string[] = [];
        try {
            if(ids.length > 0){
                for await(let id of ids){
                    if(id != null || id != undefined || id != ""){
                        let isExist : { error?: string | undefined , status?: number | undefined }|any = await this.Cart_service?.GetCartById(id);
                        if(isExist !== null || isExist !== undefined){
                            let response : ErrorStatus | number | undefined = await this.Cart_service.DeleteCart(id);
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
                res.status(400).json({error:"please select the Cart to delete"});
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

    private CalculatePrice = async (price:number,quantity:number):Promise<number> =>{
        let total_price = price * quantity
        return total_price
    }
    
    private CompleteTotalPrice = async(price:Array<number>):Promise<number> =>{
        let total_price = 0
        for (let current_price of price){
            total_price = total_price + current_price
        }
        return total_price;
    }

};
    
export default CartController