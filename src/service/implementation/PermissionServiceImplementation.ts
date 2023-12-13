import IPermissionSevice from "../interface/IPermissionService";
import PermissionRepository from "../../repository/permissionRepository";

class PermissionServiceImplementation implements IPermissionSevice{
    
    repository: PermissionRepository;

    constructor(){
        this.repository = new PermissionRepository()
    }
    
    public CreatePermission = async (PermissionData: any): Promise<object> =>{
        let response = await this.repository.CreatePermission(PermissionData);
        return response;
    }
    
    public UpdatePermission = async (id: string, PermissionData: any): Promise<[affectedCount: number]> =>{
        let response = await this.repository.UpdatePermission(id,PermissionData);
        return response;
    }
    
    public GetPermissionById = async (id: string): Promise<object | null>=> {
        let response = await this.repository.GetPermissionById(id);
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
    
    public BulkDeletePermissions = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeletePermissions(ids);
        return response;
    }

}
export default PermissionServiceImplementation;