import { Model } from "sequelize";
import { roleType } from "../../utils/types/RoleType";

interface IRoleService{

    createRole(RoleData : object  ) : Promise<object>

    UpdateRole(id:string,RoleData : object | any ):Promise<object|[affectedCount?:number|undefined]|{error : string , status : number}>

    GetRoleById(id:string):Promise< object | null >

    GetAllRoles(page:number,limit:number,keyword:string) : Promise<{rows:Array<object>; count: number}>

    GetRoleByName(name:string) :Promise<Model<roleType, roleType>|null|{error:string,status:number}>

    DeleteRole(id:string) :Promise<number |{error?:string,status?:number}|undefined>

    BulkDeleteRoles (ids:string[]) : Promise<number>

}

export default IRoleService;