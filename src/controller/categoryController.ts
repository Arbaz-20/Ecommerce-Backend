import { Request,Response } from "express"
import { ErrorStatus, categoryType} from "../utils/types/userTypes";
import { Model } from "sequelize"
import CategoryServiceImplementation from "../service/implementation/CategoryServiceImplementation";

class categoryController {
    category_service: CategoryServiceImplementation;

    constructor(){
        this.category_service = new CategoryServiceImplementation();
    }

    public CreateCategory = async( req : Request, res :Response)=>{
        let categoryData = req.body;
        if(categoryData.category_name ==  null || categoryData.category_name == undefined ||categoryData.category_name == ""){
            res.status(404).json({error : "category not found"})
        }else{
            try {
                    let categoryResponse : { error ? : string,status ? : number } | any  = await this.category_service.CreateCategory(categoryData) 
                    if(categoryResponse == null || categoryResponse == undefined){
                        res.status(400).json({error:"Something went wrong please try again"});
                    }
                    else if(categoryResponse.error){
                        res.status(categoryResponse.status).json({error:categoryResponse.error});
                    }
                    else{
                        res.status(200).json({message:"category created succcesfully"});
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

    
    public UpdateCategory = async (req : Request, res : Response ) => {
        let id = req.params.id;
        let categoryData = req.body;
        if(id == null || id == undefined){
         res.status(400).json({error:"invalid id"})
        }else{
            try {
                let isExist = await this.category_service.GetCategoryById(id);
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select category properly"})
                }else{
                    let categoryResponse = await this.category_service.UpdateCategory(id, categoryData);
                    if(categoryResponse == null || categoryResponse == undefined){
                        res.status(400).json({error : 'something went wrong please try again'})
                    }else{
                    res.status(200).json({message : " updated category successfully"}) 
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
 
    public GetCategoryById = async (req : Request,res: Response) =>{
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let categoryResponse :Model<categoryType>|{error ?:string,status?:number } | null = await this.category_service.GetCategoryById(id);
                if(categoryResponse == null || categoryResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else{
                    res.status(200).json({data: categoryResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetAllCategories = async (req : Request, res : Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword  = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let categoryResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.category_service.GetAllCategories(Number(page),limit,keyword);
            if(categoryResponse == null || categoryResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : categoryResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }

    public DeleteCategory = async(req:Request, res:Response)  => {
        let id : string = req.params?.id;
        try {
            let categoryResponse : {error?:string,status?:number} | any | number|undefined = await this.category_service.DeleteCategory(id);
            console.log(categoryResponse)
            if(categoryResponse == null || categoryResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else if (categoryResponse.error || categoryResponse.status == 400){
                res.status(categoryResponse.status as number).json({error:categoryResponse.error});
            }
            else{
                res.status(200).json({message:"deleted successfully"})
            }
        } catch (error : any) {
            console.log(error)
            res.status(400).json({error:error.message})
        }
    
    }

    public BulkDeleteCategory = async(req :Request , res : Response)=> {
        let {ids} = req.body;
        let errors: string[] = [];
        let success:string[] = [];
        try {
            if(ids.length > 0){
                for await(let id of ids){
                    if(id != null || id != undefined || id != ""){
                        let isExist : { error?: string | undefined , status?: number | undefined }|any = await this.category_service?.GetCategoryById(id);
                        if(isExist !== null || isExist !== undefined){
                            let response : ErrorStatus | number | undefined = await this.category_service.DeleteCategory(id);
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
                res.status(400).json({error:"please select the category to delete"});
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
    
export default categoryController