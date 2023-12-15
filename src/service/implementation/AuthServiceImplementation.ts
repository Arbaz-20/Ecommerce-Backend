import IAuthService from "../interface/IAuthService";
import AuthRepository from "../../repository/authRepository";
import bcryptjs from 'bcryptjs'

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
    
    public UpdateUser = async (id: string, userData: any): Promise<[affectedCount: number]> =>{
        let response = await this.repository.UpdateUser(id,userData);
        return response;
    }
    
    public GetUserById = async (id: string): Promise<object | null>=> {
        let response = await this.repository.GetUserById(id);
        return response;
    }
    
    public GetAllUsers = async (page: number, limit: number): Promise<{ rows: object[]; count: number; }>=> {
        let response = await this.repository.GetAllUsers(page,limit);
        return response;    
    }
    
    public GetUserByName = async (name: string): Promise<object[] | []> =>{
        let response = await this.repository.GetUserByName(name);
        return response;
    }
    
    public DeleteUser = async (id: string): Promise<number>=> {
        let response = await this.repository.DeleteUser(id);
        return response;
    }
    
    public BulkDeleteUsers = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteUsers(ids);
        return response;
    }

}
export default AuthServiceImplementation;