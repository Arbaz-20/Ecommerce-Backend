import IProductService from "../interface/IProductService";
import productRepository from "../../repository/productRepository";
import bcrypt from 'bcryptjs'
import { ErrorStatus } from "../../utils/types/userTypes";
class ProductServiceImplementation implements IProductService{
    
    repository: productRepository;

    constructor(){
        this.repository = new productRepository()
    }
    Updateproduct(id: string, userData: any): Promise<object | [affectedCount?: number | undefined]> {
        throw new Error("Method not implemented.");
    }
    public createProduct = async (userData: any): Promise<object> =>{
        if(userData == null || userData == undefined){
            return {error:"userdata not found",status:400}
        }else{
            let response = await this.repository.createProduct(userData);
            return response;
        }
    }
    
    public UpdateProduct= async (id: string, userData: any): Promise<object| [ affectedCount?: number]> =>{
        if(id == null || id == undefined){
            return {error:"user id is required",status:400}
        }else{
            let response : [affectedCount? : number] | object = await this.repository.UpdateProduct(id,userData);
            console.log(response);
            return response;  
        }
    }
       
    
    public GetProductById = async (id: string): Promise< object|null > => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetProductById(id);
            return response;
        }
    }
    
    public GetAllProduct = async (page: number, limit: number): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllProduct(offset,limit);
        return response;    
    }
    
    public GetProductByName = async (name: string): Promise<object[] | object> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetProductByName(name);
            return response;
        }
    }
    
    public DeleteProduct = async (id: string): Promise<ErrorStatus<object>|number> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteProduct(id);
            return response;
        }
        
    }
    
    public BulkDeleteProduct = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteProduct(ids);
        return response;
    }

}
export default ProductServiceImplementation;