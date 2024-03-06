import favouritesServiceImplementation from "../service/implementation/FavouriteServiceImplementation";
import { Response,Request, response } from "express";

class favouritesController {

    favouritess_Service: favouritesServiceImplementation
    
    constructor(){
        this.favouritess_Service = new favouritesServiceImplementation()
    }

    public createfavourites = async(req : Request, res: Response) => {
        let favouritesData = req.body;
        if(favouritesData.authId == null || favouritesData.authId == undefined ||favouritesData.productId == null || favouritesData.productId == undefined){
           res.status(400).json({error : "Please provide user id or product id in order to mark favourite"});
        }else{
            try {
                let data = {
                    authId :favouritesData.authId,
                    productId:favouritesData.productId
                }
                let isExist = await this.favouritess_Service.GetfavouritesByauthIdAndProductId(favouritesData.authId,favouritesData.productId);
                if(isExist == null || isExist == undefined){
                    let response = await this.favouritess_Service.createfavourites(data);
                    if(response){
                        res.status(200).json({data:response,message:"Added to favourite"})
                    }else{
                        res.status(400).json({error:"couldn't able to add   Please try again"})
                    }
                }else{
                    res.status(400).json({error:"Product Already added to favourite"});
                }
                
            } catch (error: any) {
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

    public updatefavourites = async(req : Request, res: Response) => {
        let id = req.params.id;
        let favouritesData =req.body;
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.favouritess_Service?.GetfavouritesById(id)
                if(isExist == null || isExist == undefined) {
                    res.status(400).json({error : "please select favourites property"})
                }else{
                    let favouritesResponse = await this.favouritess_Service?.updatefavourites(id,favouritesData)
                    if(favouritesResponse == null || favouritesResponse == undefined){
                        res.status(400).json({error : "something went wrong please try again"})
                    }else{
                        res.status(300).json({message : " favourites updated successfully"})
                    }
                }
            } catch (error: any) {
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

    public GetfavouritesById = async(req : Request, res: Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(400).json({error : "please provide id"})
        }else{
            try {
                let favouritesResponse = await this.favouritess_Service?.GetfavouritesById(id)
                if(favouritesResponse == null || favouritesResponse == undefined){
                    res.status(400).json({error : "something went wrong please try again later"})
                }else{
                    res.status(200).json({data:favouritesResponse})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetAllfavourites = async(req : Request, res: Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword  = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let favouritesResponse = await this.favouritess_Service?.GetAllfavouritess(page,limit,keyword)
            if(favouritesResponse == null || favouritesResponse == undefined){
                res.status(400).json({error : "something went wrong please try again later"})
            }else{
                res.status(200).json({data :favouritesResponse})
            }
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }

    }

    public GetAllFavouritesByauthId = async(req:Request,res:Response) => {
        let authId = req.params.id
        let page = req.query.page as unknown as number
        let limit = req.query.limit as unknown as number
        if(authId == null || authId == undefined || authId == ":id"){
            res.status(400).json({error:"please provide id"})
        }else{
            if(page == undefined && limit == undefined){
                page = 1;
                limit = 10;   
            }   
            let offset = (page - 1)*limit;
            let response = await this.favouritess_Service.GetFavouritesByauthId(authId,offset,limit);
            if(response.count == 0 || response.rows.length == 0){
                res.status(200).json({message:"No Data found",data:response})
            }else{
                res.status(200).json({data:response})
            }
        }
    }

    public Deletefavourites = async(req : Request, res: Response) => {
        let id:string = req.params.id;
        try {
            let favouritesResponse : {error : string , status : number} = await this.favouritess_Service?.Deletefavourites(id)
            if(favouritesResponse == null || favouritesResponse == undefined){
                res.status(400).json({error : "something went wrong please try again later"})
            }else if (favouritesResponse.error || favouritesResponse.status == 400){
                res.status(favouritesResponse.status).json({error:favouritesResponse.error})
            }else{
                res.status(200).json({message :"deleted successfully"})
            }
        } catch ( error:any) {
            res.status(400).json({error:error.message})
        }
    }
    public BulkDeletefavourites = async(req : Request, res: Response) => {
        let ids = req.body;
        let error:string[]=[];
        let success:string[]=[];
        try {
            if(ids.length >0){
                for await(let id of ids){
                    if(id!= null || id!= undefined||id!=""){
                        let isExist = await this.favouritess_Service?.GetfavouritesById(id)
                        if(isExist != null || isExist != undefined){
                            let response = await this.favouritess_Service?.Deletefavourites(id)
                            if(response == null || response == undefined){
                                error.push(`Please select the product properly to delete`);
                            }else if (response<0){
                                success.push(`${isExist}deleted successfully`);
                            }else{
                                error.push(`${isExist}couldnot able to  delete`);
                            }
                           
                        }
                    }
                }
            }else{
                res.status(400).json({error:"please select the favourites to delete"});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
    }

}
export default favouritesController;