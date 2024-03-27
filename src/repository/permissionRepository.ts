import { Model } from "sequelize";
import permission from "../models/permission";
import { permissionType } from "../utils/types/userTypes";


class PermissionRepository{
 
    constructor(){

    }
    public CreatePermission = async ( PermissionData : permissionType | any ) : Promise<object> => {
        return await permission.create(PermissionData);
    }

    public UpdatePermission = async (id:string,PermissionData : object | any ) : Promise<[affectedCount: number]> => {
        return await permission.update(PermissionData,{where:{id:id}});
    }

    public UpdatePermissionByUserId = async (user_id:string,PermissionData : object | any ) : Promise<[affectedCount: number]> => {
        return await permission.update(PermissionData,{where:{userId:user_id}});
    }

    public GetPermissionById = async (id:string):Promise< object | null > =>{
        return await permission.findByPk(id);
    }
    
    public getPermissionByUserId = async (user_id:string):Promise<Model<permissionType>|null> => {
        return await permission.findOne({where: {authId:user_id}});
    }

    public GetAllPermissions = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await permission.findAndCountAll({
            offset:page,
            limit:limit,
            order:[["updatedAt","DESC"]],
        });
    }

    public DeletePermission = async(id:string) :Promise<number> => {
        return await permission.destroy({where:{id:id}});
    }

    public DeletePermissionByRoleId = async (roleId:string) : Promise<number> => {
        return await permission.destroy({where:{roleId:roleId}});
    }

    public BulkDeletePermissionsByUserId = async (userId:string[]) : Promise<number> => {
        return await permission.destroy({where:{userId:userId}})
    }

    public BulkDeletePermissions = async (ids:string[]) : Promise<number> => {
        return await permission.destroy({where:{id:ids}})
    }
}

export default PermissionRepository