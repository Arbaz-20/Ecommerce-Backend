import IAuthService from "../interface/IAuthService";
import AuthRepository from "../../repository/authRepository";
import bcrypt from 'bcryptjs'
import { ErrorStatus, UpdateReturn, UserType, user } from "../../utils/types/userTypes";
import { Model } from "sequelize";
class AuthServiceImplementation implements IAuthService{
    
    repository: AuthRepository;

    constructor(){
        this.repository = new AuthRepository()
    }
   
    
    public CreateUser = async (userData: UserType): Promise<{error?:string,status?:number}|UserType> =>{
        if(userData.password == null || userData.password == undefined){
            return {error:"Password is required",status:400}
        }else{
            let salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(userData.password, salt);
            userData = JSON.parse(JSON.stringify(userData));
            userData["password"] = password
            let response = await this.repository.CreateUser(userData);
            return response as unknown as UserType
            
        }
    }

    public LoginController = async (userData: any): Promise<any>=>{
        if(userData.password == null || userData.password == undefined){
            return {error:"Password is required",status:400}
        }else[

        ]
    }
    
    public UpdateUser = async (id: string, userData: UserType):Promise<{error?:string,status:400}|[affectedCount?:number]> =>{
        if(id == null || id == undefined){
            return {error:"Please Select user to update",status:400} as {error?:string,status:400};
        }else{
            if(userData.password == null || userData.password == undefined){
                let response : {error?:string,status:400}|[affectedCount? : number] = await this.repository.UpdateUser(id,userData);
                return response               
            }else{
                let salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(userData.password, salt);
                userData = JSON.parse(JSON.stringify(userData));
                userData["password"] = password
                let response : {error?:string,status:400}|[affectedCount?:number|undefined] = await this.repository.UpdateUser(id,userData);
                return response;
            }
        }
    }
       
    
    public GetUserById = async (id: string): Promise<Model<user> |null|ErrorStatus> => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetUserById(id);
            return response;
        }
    }
    
    public GetAllUsers = async (page: number, limit: number,name:string): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllUsers(offset,limit,name);
        return response;    
    }
    
    public GetUserByName = async (name: string): Promise<object[] | object> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetUserByName(name);
            return response;
        }
    }
    public GetUserByEmail = async(email: string): Promise<user|null>=> {
        let response = await this.repository.GetUserByEmail(email);
        return response as user;
       
    }
    
    public DeleteUser = async (id: string): Promise<{error?:string,status?:number}|number> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteUser(id);
            return response;
        }
        
    }
    
    public BulkDeleteUsers = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteUsers(ids);
        return response;
    }

}
export default AuthServiceImplementation;