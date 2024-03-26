import role from "../models/role";
import { Op } from "sequelize";

class RoleRespository {
    constructor(){

    }

    public createRole = async ( roleData : object | any ) : Promise<object> => {
        return await role.create(roleData);
    }

    public UpdateRole = async (id:string, roleData : object|any ):Promise<[affectedCount?:number|undefined]|{error : string , status : number}>=>{
        return await role.update(roleData,{where:{id:id}});
    }

    public GetRoleById = async (id:string):Promise< object | null |{error?:string,status?:number}> =>{
        return await role.findByPk(id);
    }

    public GetAllRoles = async (page:number,limit:number,keyword:string) : Promise<{rows:Array<object>; count: number}> => {
        return await role.findAndCountAll({
            where:{
                name:{
                    [Op.iLike]:`%${keyword}%`
                }
            },
            offset:page,
            limit:limit,
            order:[["updatedAt","DESC"]]
        });
    }

    public GetRoleByName = async (name:string) :Promise<object[] | [] > => {
        return await role.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public DeleteRole = async(id:string) :Promise<number> => {
        return await role.destroy({where:{id:id}});
    }

    public BulkDeleteRoles = async(ids:string[]) :Promise<number> => {
        return await role.destroy({where:{id:ids}})
    }

}

export default RoleRespository;