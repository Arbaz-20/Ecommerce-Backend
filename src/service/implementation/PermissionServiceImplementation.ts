import IPermissionSevice from "../interface/IPermissionService";
import PermissionRepository from "../../repository/permissionRepository";
import { permissionType } from "../../utils/types/userTypes";
import { Model } from "sequelize";

class PermissionServiceImplementation implements IPermissionSevice{
    
    repository: PermissionRepository;

    constructor(){
        this.repository = new PermissionRepository()
    }
    
    public CreatePermission = async (PermissionData: permissionType): Promise<object> =>{
        let response = await this.repository.CreatePermission(PermissionData);
        return response;
    }
    
    public UpdatePermission = async (id: string, PermissionData: any): Promise<[affectedCount: number]> =>{
        let response = await this.repository.UpdatePermission(id,PermissionData);
        return response;
    }

    public UpdatePermissionByUserId = async (user_id:string,PermissionData : object | any ) : Promise<[affectedCount: number]> => {
        let response = await this.repository.UpdatePermissionByUserId(user_id,PermissionData);
        return response;
    }
    
    public GetPermissionById = async (id: string): Promise<object | null>=> {
        let response = await this.repository.GetPermissionById(id);
        return response;
    }

    public getPermissionByUserId = async (user_id:string):Promise<Model<permissionType>|null> => {
        let response = await this.repository.getPermissionByUserId(user_id);
        return response;
    }

    
    public GetAllPermissions = async (page: number, limit: number): Promise<{ rows: object[]; count: number; }>=> {
        let response = await this.repository.GetAllPermissions(page,limit);
        return response;    
    }
    
    
    public DeletePermission = async (id: string): Promise<number>=> {
        let response = await this.repository.DeletePermission(id);
        return response;
    }
    
    public DeletePermissionsByRoleId = async(userId: string): Promise<number>=> {
        let response = await this.repository.DeletePermissionByRoleId(userId);
        return response;
    }

    public BulkDeletePermissionsByUserId = async (userId: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeletePermissionsByUserId(userId);
        return response;
    }
    public BulkDeletePermissions = async (ids:string[]) : Promise<number> => {
        let response = await this.repository.BulkDeletePermissions(ids);
        return response;
    }

}
export default PermissionServiceImplementation;