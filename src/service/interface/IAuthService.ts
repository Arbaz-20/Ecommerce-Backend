import { Model } from "sequelize";
import { ErrorStatus, UserType, user } from "../../utils/types/userTypes";

interface IAuthService{

    CreateUser( userData : object | any ) : Promise<{error?:string|undefined,status?:number|undefined} | Model<UserType,UserType>|UserType>

    UpdateUser(id:string, userData : object | any ):Promise<{error?:string,status:400}|[affectedCount?:number|undefined]>

    GetUserById(id:string):Promise<Model<user>|null|ErrorStatus >

    GetAllUsers(page:number,limit:number,name:string) : Promise<{rows:Array<object>; count: number}>

    GetUserByName(name:string) :Promise<object[] | object>

    GetUserByEmail(email:string) :Promise<object|null>

    DeleteUser(id:string) :Promise<number |object>

    BulkDeleteUsers (ids:string[]) : Promise<number>

}

export default IAuthService;