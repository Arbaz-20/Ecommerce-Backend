import { Model } from "sequelize";
import { CartType } from "../../utils/types/cartType";

interface ICartService {
     
    createCart (cartdata: object): Promise<object>

    updateCart(id: string, cartdata: object): Promise<[affectedCount?:number|undefined]>

    GetCartById(id: string): Promise<CartType |{error?:string,status?:number}|null>

    GetCartByUserId (user_id:string):Promise<{rows:Array<CartType>; count:number}|{rows:Array<object>; count:number,subtotal:number}>

    GetAllCarts(page:number,limit:number): Promise<{rows:Array<CartType>; count: number}>

    GetCartByName(name:string): Promise<object[]|[]>

    DeleteCart(id:string): Promise<number>

    BulkDeleteCarts(ids:string[]):Promise<number>

}

export default ICartService;