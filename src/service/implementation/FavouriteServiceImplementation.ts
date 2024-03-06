import IfavouritesService from "../interface/IfavouriteSetvice";
import favouritessRepository from "../../repository/favoriteRepository";
import { Model } from "sequelize";

class favouritesServiceImplementation implements IfavouritesService{
    
    repository: favouritessRepository;

    constructor(){
        this.repository = new favouritessRepository()
    }
    public createfavourites = async (favouritesdata: object): Promise<object> =>{
        if(favouritesdata == null || favouritesdata == undefined){
            return {error :  "favouritesdata not found",status : 400 };
            }else{
                let response = await this.repository.createfavourites(favouritesdata)
                return  response;
            }
    }
    public updatefavourites = async (id: string, favouritesdata: object): Promise<[affectedCount?: number | undefined]|any>=> {
        if(id == null || id == undefined){
            return {error:"colour id is required",status:400}
        }else{
            let response : [affectedCount? : number] | object = await this.repository.updatefavourites(id,favouritesdata);
            console.log(response);
            return response
        }
    }
    public GetfavouritesById = async (id: string): Promise<object | { error?: string | undefined; status?: number | undefined; } | null>=> {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetfavouritesById(id);
            return response;
        }
    }
    public GetAllfavouritess = async (page: number, limit: number,keyword:string): Promise<{ rows: object[]; count: number; }> =>{
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllfavouritess(offset,limit,keyword);
        return response;   
    }
    public GetfavouritesByName = async (name: string): Promise<object[] | []|any> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetfavouritesByName(name);
            return response;
        }
    }

    public GetfavouritesByauthIdAndProductId = async (authId:string,product_id:string) :Promise<object | null > => {
        let response = await this.repository.GetfavouritesByauthIdAndProductId(authId,product_id)
        return response
    }

    public GetFavouritesByauthId = async(authId:string,page:number,limit:number):Promise<{count:number,rows:Model<any,any>[]}> =>{
        let response = await this.repository.GetFavouritesByauthId(authId,page,limit)
        return response
    }
    public Deletefavourites = async (id: string): Promise<number|{error?:string,status?:number}|any>=> {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.Deletefavourites(id);
            return response;
        }
    }
    public BulkDeletefavouritess = async (ids: string[]): Promise<number> =>{
        let response = await this.repository.BulkDeletefavouritess(ids);
        return response;
    }

    
};

export default favouritesServiceImplementation;
