import RoleServiceImplementation from "../service/implementation/RoleServiceImplementation";
import { Request , Response} from "express";
import { ErrorStatus } from "../utils/types/userTypes";

class roleController{
    roleService: RoleServiceImplementation 

    constructor(){
        this.roleService = new RoleServiceImplementation();
    }

    public CreateRole = async(req:Request,res:Response)=>{
        let roleData = req.body
        if(roleData.name == null || roleData.name == undefined){
            res.status(400).json({error:"Please Provide Role Name"})
        }else{
            try {
                let isExist = await this.roleService.GetRoleByName(roleData.name);
                if(isExist){
                    res.status(400).json({error:`Role ${roleData.name} Already Exists`});
                }else{
                    let roleResponse = await this.roleService.createRole(roleData)
                    if (roleResponse == null ||  roleResponse == undefined){
                        res.status(400).json({error:"something went wrong"})
                    }else{
                        res.status(200).json({message:"created successfully"})
                    }
                }
            } catch (error : any) {
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
    public UpdateRole = async(req:Request,res:Response)=>{
        let id =req.params.id
        let roledata = req.body
        if(id == null || id == undefined || roledata == null || roledata == undefined){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let roleResponse : [affectedCount?:number|undefined]|{error : string , status : number}|any= await this.roleService.UpdateRole(id,roledata)
                if (roleResponse == 0){
                    res.status(400).json({error:"something went wrong"})
                }else{
                    res.status(200).json({message:"updated successfully"})
                }
            } catch (error : any) {
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
    public GetRoleById =async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let roleResponse :{error ?:string,status?:number } | null = await this.roleService.GetRoleById(id);
                if(roleResponse == null || roleResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else{
                    res.status(200).json({data: roleResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllRoles = async (req : Request, res : Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword = req.query.keyword as string 
        keyword = keyword == null || keyword == undefined || keyword == "" ? "" : keyword
        try {
            let roleResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.roleService.GetAllRoles(Number(page),limit,keyword);
            if(roleResponse == null || roleResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : roleResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteRole = async(req:Request, res:Response)  => {
        let id : string = req.params?.id;
        try {
            let roleResponse : {error?:string,status?:number} | any | number|undefined = await this.roleService.DeleteRole(id);
            if(roleResponse == null || roleResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else if (roleResponse.error || roleResponse.status == 400){
                res.status(roleResponse.status as number).json({error:roleResponse.error});
            }
            else{
                res.status(200).json({message:"deleted successfully"})
            }
        } catch (error : any) {
            console.log(error)
            res.status(400).json({error:error.message})
        }
    }
    public BulkDeleteProduct = async (req : Request,res:Response) => {
        let ids : string[] = req.body.ids;
        let errors: string[] = [];
        let success:string[] = [];
        try {
            for await(let id of ids ){
                if(id != null || id != undefined || id != ""){
                    let isExist : { error?: string | undefined , status?: number | undefined }|any = await this.roleService.GetRoleById(id);
                    if(isExist !== null || isExist !== undefined){
                        let response : ErrorStatus | number | undefined = await this.roleService.DeleteRole(id);
                        if(response == undefined || response == null){
                            errors.push(`Please select the role properly to delete`);
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
            if(errors.length > 0){
                res.status(400).json({error:errors});
            }else if(errors.length > 0,success.length > 0){
                res.status(400).json({success:success,error:errors});
            }else{
                res.status(400).json({success:success , message:"All Deleted Successfully"});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
    }  
}

export default roleController