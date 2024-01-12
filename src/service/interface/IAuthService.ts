import { Model } from "sequelize";
import { ErrorStatus, UserType, user } from "../../utils/types/userTypes";

interface IAuthService{

    CreateUser( userData : object | any ) : Promise<object>

    UpdateUser(id:string, userData : object | any ):Promise<object|[affectedCount?:number|undefined]>

    GetUserById(id:string):Promise<Model<user>|null|ErrorStatus >

    GetAllUsers(page:number,limit:number) : Promise<{rows:Array<object>; count: number}>

    GetUserByName(name:string) :Promise<object[] | object>

    GetUserByEmail(email:string) :Promise<object|null>

    DeleteUser(id:string) :Promise<number |object>

    BulkDeleteUsers (ids:string[]) : Promise<number>

}

export default IAuthService;