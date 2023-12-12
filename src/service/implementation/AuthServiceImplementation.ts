import IAuthService from "../interface/IAuthService";
import AuthRepository from "../../repository/authRepository";

class AuthServiceImplementation implements IAuthService{
    
    repository: AuthRepository;

    constructor(){
        this.repository = new AuthRepository()
    }
    
    public CreateUser = async (userData: any): Promise<object> =>{
        let response = await this.repository.CreateUser(userData);
        return response;
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