import IAuthService from "../interface/IAuthService";
import AuthRepository from "../../repository/authRepository";
import bcryptjs from 'bcryptjs'
import { user,ErrorStatus } from "../../utils/types/userTypes";
class AuthServiceImplementation implements IAuthService{
    
    repository: AuthRepository;

    constructor(){
        this.repository = new AuthRepository()
    }
    
    public CreateUser = async (userData: any): Promise<object> =>{
        if(userData.password == null || userData.password == undefined){
            return {error:"Password is required",status:400}
        }else{
            let salt = await bcryptjs.genSalt(10);
        let password = await bcryptjs.hash(userData.passworda, salt);
        userData["password"] = password
            let response = await this.repository.CreateUser(userData);
            return response;
        }
    }
    
    public UpdateUser = async (id: string, userData: any): Promise<object| [ affectedCount?: number|undefined]> =>{
        if(id == null || id == undefined){
            return {error:"user id is required",status:400}
        }else{
            let salt = await bcryptjs.genSalt(10);
            let password = await bcryptjs.hash(userData.password, salt);
            userData["password"] = password
            let response : [affectedCount? : number] | object = await this.repository.UpdateUser(id,userData);
            return response;
        }
    }
       
    
    public GetUserById = async (id: string): Promise< object|null > => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetUserById(id);
            return response;
        }
    }
    
    public GetAllUsers = async (page: number, limit: number): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllUsers(offset,limit);
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
    
    public DeleteUser = async (id: string): Promise<ErrorStatus<object>|number> => {
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