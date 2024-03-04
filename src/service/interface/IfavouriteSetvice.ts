import { Model } from "sequelize"
import { product } from "../../utils/types/userTypes"

interface IfavouritesService {
     
    createfavourites (favouritesdata: object): Promise<object>

    updatefavourites(id: string, favouritesdata: object): Promise<[affectedCount?:number|undefined]>

    GetfavouritesById(id: string): Promise<object | null |{error?:string,status?:number}>

    GetfavouritesByUserIdAndProductId(user_id:string,product_id:string) :Promise<object | null >

    GetAllfavouritess(page:number,limit:number,keyword:string): Promise<{rows:Array<object>; count: number}>

    GetFavouritesByUserId(user_id:string,page:number,limit:number):Promise<{count:number,rows:Model<any,any>[]}> 

    GetfavouritesByName(name:string): Promise<object[]|[]>

    Deletefavourites(id:string): Promise<number>

    BulkDeletefavouritess(ids:string[]):Promise<number>

}

export default IfavouritesService;