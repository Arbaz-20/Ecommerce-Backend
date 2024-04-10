import IRoleService from "../interface/IRoleService";
import RoleRespository from "../../repository/roleRepository";
import { roleType } from "../../utils/types/RoleType";
import { Model } from "sequelize";

class RoleServiceImplementation implements IRoleService{
    
    repository: RoleRespository;

    constructor(){
        this.repository = new RoleRespository()
    }
    
    public createRole = async (RoleData: object): Promise<object> =>{
        if(RoleData == null || RoleData == undefined){
            return {error:"RoleData not found",status:400}
        }else{
            let response = await this.repository.createRole(RoleData);
            return response;
        }
    }
    
    public UpdateRole = async (id: string, RoleData: object): Promise<object| [ affectedCount?: number]|{error : string , status : number}> =>{
        if(id == null || id == undefined){
            return {error:"Role id is required",status:400}
        }else{
            let response : [affectedCount? : number] | object = await this.repository.UpdateRole(id,RoleData);
            console.log(response);
            return response
        }
    }

    public GetRoleById = async (id: string): Promise< roleType|null|{error?:string,status?:400} > => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetRoleById(id);
            return response as roleType
        }
    }
    
    public GetAllRoles = async (page: number, limit: number,keyword:string): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllRoles(offset,limit,keyword);
        return response;    
    }
    
    public GetRoleByName = async (name: string): Promise<Model<roleType, roleType>|null|{error:string,status:number}> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetRoleByName(name);
            return response;
        }
    }
    
    public DeleteRole = async (id: string): Promise<number | {error?:string,status?:number} | undefined> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteRole(id);
            return response;
        }
        
    }
    
    public BulkDeleteRoles = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteRoles(ids);
        return response;
    }

};
export default RoleServiceImplementation