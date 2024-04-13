import ICartService from "../interface/ICartService";
import cartRepository from "../../repository/cartRepository";
import { CartType } from "../../utils/types/cartType";
import { Model } from "sequelize";

class CartServiceImplementation implements ICartService{
    
    repository: cartRepository;

    constructor(){
        this.repository = new cartRepository()
    }
    public createCart = async (cartdata: object): Promise<object> =>{
        if(cartdata == null || cartdata == undefined){
            return {error :  "cartdata not found",status : 400 };
            }else{
                let response = await this.repository.createCart(cartdata)
                return  response;
            }
    }
    public updateCart = async (id: string, cartdata: object): Promise<[affectedCount?: number | undefined]|any>=> {
        if(id == null || id == undefined){
            return {error:"colour id is required",status:400}
        }else{
            let response : [affectedCount? : number] | object = await this.repository.updateCart(id,cartdata);
            console.log(response);
            return response
        }
    }
    public GetCartById = async (id: string): Promise<CartType |{error?:string,status?:number}|null>=> {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response : CartType | {error?:string,status?:number}|null = await this.repository.GetCartById(id);
            return response
        }else{
            let data:CartType | {error?:string,status?:number}|null = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetCartByUserId =async(user_id:string):Promise<{rows:Array<CartType>; count:number;subtotal?:number}>=>{
        let response = await this.repository.GetCartByUserId(user_id)
        return response;
    }

    public GetAllCarts = async (page: number, limit: number,keyword:string): Promise<{ rows: object[]; count: number; }> =>{
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllCarts(offset,limit,keyword);
        return response;   
    }
    public GetCartByName = async (name: string): Promise<object[] | []|any> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetCartByName(name);
            return response;
        }
    }
    
    public DeleteCart = async (id: string): Promise<number|{error?:string,status?:number}|any>=> {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteCart(id);
            return response;
        }
    }

    public DeleteCartByUserId = async(user_id:string) :Promise<{error:"id is required",status:400}|number> => {
        if(user_id == null || user_id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteCartByUserId(user_id);
            return response;
        }
    }

    public BulkDeleteCarts = async (ids: string[]): Promise<number> =>{
        let response = await this.repository.BulkDeleteCarts(ids);
        return response;
    }

    
};

export default CartServiceImplementation;